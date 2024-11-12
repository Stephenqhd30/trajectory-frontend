import type { BytemdPlugin } from 'bytemd';
import { visit } from 'unist-util-visit';

export default function escapeHtmlTags(): BytemdPlugin {
  return {
    remark: (processor) =>
      // @ts-ignore
      processor.use(() => (treeNode) => {
        visit(treeNode, 'html', (node) => {
          // 排除的标签列表
          const excludeTags = ['img', 'br', 'p', 'text'];

          // 解析HTML标签，检查是否包含src属性且src属性有值
          const parser = new DOMParser();
          const doc = parser.parseFromString(node.value, 'text/html');
          const allElements = doc.body.getElementsByTagName('*');

          let shouldEscape = true;
          for (const el of allElements as any) {
            if (
              excludeTags.includes(el.tagName.toLowerCase()) &&
              (el.tagName.toLowerCase() !== 'img' || el.getAttribute('src'))
            ) {
              shouldEscape = false;
              break;
            }
          }

          if (shouldEscape) {
            node.value = node.value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          }
        });
      }),
  };
}
