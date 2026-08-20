import { WS_URL } from '@/constants';
import type { SocketMessage, SocketEventType } from '@/types';

type Handler = (payload: unknown) => void;

class InterviewSocket {
  private ws: WebSocket | null = null;
  private handlers: Map<SocketEventType, Handler[]> = new Map();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private interviewId: string | null = null;

  connect(interviewId: string, token: string) {
    this.interviewId = interviewId;
    const url = `${WS_URL}/interview/${interviewId}?token=${token}`;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log('[WS] Connected');
      this.emit('heartbeat', {});
    };

    this.ws.onmessage = (event) => {
      try {
        const msg: SocketMessage = JSON.parse(event.data as string);
        const fns = this.handlers.get(msg.type) ?? [];
        fns.forEach((fn) => fn(msg.payload));
      } catch {
        // ignore parse errors
      }
    };

    this.ws.onclose = () => {
      console.log('[WS] Disconnected — reconnecting in 3s');
      this.reconnectTimer = setTimeout(() => {
        if (this.interviewId) this.connect(this.interviewId, token);
      }, 3000);
    };

    this.ws.onerror = (e) => console.error('[WS] Error', e);
  }

  on(type: SocketEventType, handler: Handler) {
    if (!this.handlers.has(type)) this.handlers.set(type, []);
    this.handlers.get(type)!.push(handler);
    return () => this.off(type, handler);
  }

  off(type: SocketEventType, handler: Handler) {
    const fns = this.handlers.get(type) ?? [];
    this.handlers.set(type, fns.filter((f) => f !== handler));
  }

  send(type: SocketEventType, payload: unknown) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload, timestamp: Date.now() }));
    }
  }

  private emit(type: SocketEventType, payload: unknown) {
    this.send(type, payload);
  }

  disconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.ws?.close();
    this.ws = null;
  }

  get status(): 'connecting' | 'connected' | 'disconnected' {
    if (!this.ws) return 'disconnected';
    if (this.ws.readyState === WebSocket.CONNECTING) return 'connecting';
    if (this.ws.readyState === WebSocket.OPEN) return 'connected';
    return 'disconnected';
  }
}

export const interviewSocket = new InterviewSocket();
