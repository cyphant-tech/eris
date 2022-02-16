import path from 'path';
import ejs from 'ejs';
import copyAsync from '../utils/copy_async';
import * as log from '../utils/log';
import delay from '@/utils/promise_delay';

const ONLY_COPY_FILES = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.ttf',
  '.eot',
  '.otf',
  '.woff',
  '.svf',
  '.mp3',
  '.mp4',
  '.avi',
  '.pdf',
  '.apk',
];

interface CompilerOptions {
  src: string;
  dest: string;
  config: { [key: string]: any };
  onStart?: () => void;
  onDone?: () => void;
}

class Compiler {
  private src: string;
  private dest: string;
  private config: { [key: string]: any };
  private resolve: { [key: string]: any };
  private onStart: () => void;
  private onDone: () => void;

  constructor(options: CompilerOptions) {
    this.src = options.src;
    this.dest = options.dest;
    this.config = options.config;

    if (this.config.customParams) {
      this.config = { ...this.config, ...this.config.customParams };
    }

    // Compiler 内置配置
    this.resolve = {
      extensions: [
        '.js',
        '.jsx',
        '.less',
        '.css',
        '.scss',
        '.ejs',
        '.ts',
        '.tsx',
        '.md',
        '.json',
        '.vue',
      ],
      // exclude: [/node_modules/, /\.umi\/?$/, /\.git/, /yarn\.lock/, /package-lock\.json/],
      exclude: [/\.umi\/?$/, /\.git/, /yarn\.lock/, /package-lock\.json/],
    };

    this.onStart = options.onStart;
    this.onDone = options.onDone;

    this.init();
  }

  async init() {
    this.onStart && this.onStart();
    // 暂时不支持 handler
    // 同步处理
    // copySync(this.src, this.dest);
    // content => this.compileFileContent(content, this.config)
    await copyAsync(this.src, this.dest, {
      exclude: this.resolve.exclude,
      onlyCopy: ONLY_COPY_FILES,
      handler: (file: string, content: string) => {
        if (this.resolve.extensions.includes(path.extname(file))) {
          return this.compileFileContent(content, this.config);
        }
        return content;
      },
    });

    // hack copyAsync resolved 不准确
    await delay(1000);

    this.onDone && this.onDone();
  }

  compileFileContent(tpl: string, data: { [key: string]: any }) {
    try {
      tpl = ejs.render(tpl, data);
    } catch (e) {
      log.logError(e.toString());
      return tpl;
    }
    return tpl;
  }
}

export default Compiler;
