import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:19006'],
    credentials: true,
  },
})
export class WebSocketsGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('join-split')
  handleJoinSplit(@MessageBody() data: { splitId: string; userId: string }) {
    this.server.emit('user-joined', { ...data, timestamp: new Date() })
    return { event: 'joined-split', data }
  }

  @SubscribeMessage('split-update')
  handleSplitUpdate(@MessageBody() data: any) {
    this.server.emit('split-updated', data)
    return { event: 'split-updated', data }
  }
}
