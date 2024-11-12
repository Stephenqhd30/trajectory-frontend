import type { BytemdPlugin } from 'bytemd';

import { ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT } from './icon';

export interface AlignPluginOptions {
  locale?: Record<string, string>;
}

/**
 * 对齐方式插件
 */
export default function alignPlugin(options?: AlignPluginOptions): BytemdPlugin {
  return {
    actions: [
      {
        title: options?.locale?.alignType || '对齐方式',
        icon: ALIGN_CENTER,
        handler: {
          type: 'dropdown',
          actions: [
            {
              title: options?.locale?.alignTypeLeft || '左对齐',
              icon: ALIGN_LEFT,
              handler: {
                type: 'action',
                click: (ctx) => {
                  ctx.wrapText('<p align="left">', '</p>');
                  ctx.editor.focus();
                },
              },
            },
            {
              title: options?.locale?.alignTypeCenter || '居中对齐',
              icon: ALIGN_CENTER,
              handler: {
                type: 'action',
                click: (ctx) => {
                  ctx.wrapText('<p align="center">', '</p>');
                  ctx.editor.focus();
                },
              },
            },
            {
              title: options?.locale?.alignTypeRight || '右对齐',
              icon: ALIGN_RIGHT,
              handler: {
                type: 'action',
                click: (ctx) => {
                  ctx.wrapText('<p align="right">', '</p>');
                  ctx.editor.focus();
                },
              },
            },
          ],
        },
      },
    ],
  };
}
