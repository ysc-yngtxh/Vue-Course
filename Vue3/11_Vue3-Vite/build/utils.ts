import type { PluginOption } from 'vite'
import { loadEnv } from 'vite'

/**
 * 包装环境变量
 * @param env 环境变量对象
 */
export function wrapperEnv(env: Record<string, string>): ViteEnv {
    const ret: any = {}

    for (const envName of Object.keys(env)) {
        let realValue = env[envName].replace(/\\n/g, '\n')

        // 转换布尔值
        realValue = realValue === 'true' ? true : realValue === 'false' ? false : realValue

        // 转换数字
        if (envName === 'VITE_PORT') {
            realValue = Number(realValue)
        }

        // 处理数组 (如 VITE_PROXY)
        if (envName === 'VITE_PROXY' && realValue) {
            try {
                realValue = JSON.parse(realValue)
            } catch (error) {
                console.error('Error parsing VITE_PROXY:', error)
                realValue = []
            }
        }

        ret[envName] = realValue
        process.env[envName] = realValue
    }
    return ret
}

/**
 * 创建Vite插件
 * @param viteEnv 环境变量
 */
export function createVitePlugins(viteEnv: ViteEnv): PluginOption[] {
    const { VITE_DROP_CONSOLE } = viteEnv
    return [
        // 这里可以添加其他插件配置
        {
            name: 'vite-plugin-drop-console',
            apply: 'build',
            transform(code) {
                if (VITE_DROP_CONSOLE) {
                    return code.replace(/console\.log\(.*?\);?/g, '')
                }
                return code
            }
        }
    ]
}

// 环境变量类型定义
export interface ViteEnv {
    VITE_PORT: number
    VITE_PUBLIC_PATH: string
    VITE_PROXY: [string, string][]
    VITE_DROP_CONSOLE: boolean
    VITE_LEGACY?: boolean
    // 其他自定义环境变量...
}