import { io, Socket } from "socket.io-client"
import { API_BASE_URL } from "./const"

export class WSAdapter {
  private socket: Socket

  constructor(auto: boolean = true) {
    this.socket = io(`${API_BASE_URL}/chat`, {
      transports: ["websocket"],
      autoConnect: auto,
      reconnectionAttempts: 10,
    })
  }

  connect() {
    this.recieve("connect", () => {
      console.log(`connected: ${this.socket.id}`)
    })
    this.socket.connect()
  }

  recieve(ev: string, callback: (...args: any[]) => void) {
    this.socket.on(ev, callback)
  }

  emit(ev: string, ...args: any[]): Promise<Socket> {
    return new Promise((resolve) => {
      resolve(this.socket.emit(ev, ...args))
    })
  }

  disconnect() {
    this.socket.disconnect()
  }
}
