import { ICell } from "@/types";

class EventEmitter<T extends Record<string, any>> {
  private events: { [K in keyof T]?: Array<(payload: T[K]) => void> } = {};

  // 订阅事件
  on<K extends keyof T>(event: K, listener: (payload: T[K]) => void): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event]!.push(listener);
  }

  // 取消订阅
  off<K extends keyof T>(event: K, listener: (payload: T[K]) => void): void {
    if (!this.events[event]) return;
    this.events[event] = this.events[event]!.filter(l => l !== listener);
  }

  // 触发事件
  emit<K extends keyof T>(event: K, payload: T[K]): void {
    if (!this.events[event]) return;
    this.events[event]!.forEach(listener => listener(payload));
  }
}

export interface ISettingEvents{
  type:string,
  data:string | ICell
}

// 定义可用的事件类型
interface Events {
  message: string;
  update: { id: number; status: string };
  input:string,
  'cell-label-input':string,
  'setting':ISettingEvents
}

// 使用 EventEmitter
export const EventEmitterIns = new EventEmitter<Events>();