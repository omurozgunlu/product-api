import { createClient, RedisClientType } from 'redis'
import debug from 'debug'
const log: debug.IDebugger = debug('app:product-service')

class RedisService {
  client: RedisClientType<any> | null
  constructor() {
    this.client = null
  }
  async connect() {
    if (this.client) return
    this.client = createClient({
      socket: {
        host: 'redis'
      }
    })
    log('connecting to redis')
    await this.client.connect()
    log('connected to redis')
  }
  async set(key: string, value: object) {
    if (!this.client) {
      await this.connect()
    }
    log('setting value on redis')
    const valueStr = JSON.stringify(value)
    if (this.client) await this.client.set(key, valueStr)
  }

  async get(key: string): Promise<any> {
    await this.connect()
    log('getting value on redis')
    let val
    if (this.client) val = await this.client.get(key)
    if (val) return JSON.parse(val)
    else return null
  }
}

export const redisService = new RedisService()
