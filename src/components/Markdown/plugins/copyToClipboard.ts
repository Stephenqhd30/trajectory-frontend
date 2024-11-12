import type { BytemdPlugin } from 'bytemd';
import { visit } from 'unist-util-visit';
import { message } from 'antd';

// 复制的方法,直接使用浏览器的 API 即可实现复制
const copyToClipboard = async (text: string) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      console.log("当前代码已复制到剪贴板");
    } catch (err) {
      console.error("复制代码失败，请手动复制");
      console.error("复制失败!", err);
    }
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(textarea);
      message.success("已复制到剪贴板");
    } catch (err) {
      document.body.removeChild(textarea);
      message.error("复制代码失败，请手动复制");
      console.error("无法复制到剪贴板", err);
    }
  }
};

// 一些图标
const clipboardCheckIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-check"><path d="m12 15 2 2 4-4"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const successTip = `<span style="font-size: 0.90em;">复制成功!</span>`;
const foldBtn = `<svg t="1726055300369" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2293" width="1em" height="1em"><path d="M232 392L512 672l280-280z" fill="#707070" p-id="2294"></path></svg>`;
const newSvgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L2 12h10l0 10l10-10h-10z" /></svg>`;

export default function codeCopy(): BytemdPlugin {
  return {
    rehype: (processor) =>
      processor.use(() => (tree: any) => {
        visit(tree, "element", (node) => {
          if (node.tagName === "pre") {
            const codeNode = node.children.find((child: any) => child.tagName === "code");
            const language =
              codeNode?.properties?.className
                ?.find((cls: any) => cls.startsWith("language-"))
                ?.replace("language-", "") || "text";

            if (codeNode) {
              node.children.unshift({
                type: "element",
                tagName: "div",
                properties: {
                  className: ["code-block-extension-header"],
                },
                children: [
                  {
                    type: "element",
                    tagName: "div",
                    properties: {
                      className: ["code-block-extension-headerLeft"],
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "div",
                        properties: {
                          className: ["code-block-extension-foldBtn"],
                        },
                        children: [
                          {
                            type: "text",
                            value: "▼",
                          },
                        ],
                      },
                      {
                        type: "element",
                        tagName: "span",
                        properties: {
                          className: ["code-block-extension-lang"],
                        },
                        children: [{ type: "text", value: language }],
                      },
                    ],
                  },
                  {
                    type: "element",
                    tagName: "div",
                    properties: {
                      className: ["code-block-extension-headerRight"],
                      style: "cursor: pointer;",
                    },

                    children: [
                      {
                        type: "element",
                        tagName: "div",
                        properties: {
                          className: ["code-block-extension-copyCodeBtn"],
                          style: "filter: invert(0.5); opacity: 0.6;",
                        },
                        children: [{ type: "text", value: "复制代码" }],
                      },
                    ],
                  },
                ],
              });

              node.properties = {
                ...node.properties,
              };
            }
          }
        });
      }),

    viewerEffect({ markdownBody }) {
      const copyButtons = markdownBody.querySelectorAll(".code-block-extension-copyCodeBtn");
      const foldButtons = markdownBody.querySelectorAll(".code-block-extension-foldBtn");

      copyButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const pre = button.closest("pre");
          const code = pre?.querySelector("code")?.textContent || "";
          copyToClipboard(code);

          const tmp = button.innerHTML;
          button.innerHTML = clipboardCheckIcon + successTip;
          setTimeout(() => {
            button.innerHTML = tmp;
          }, 1500);
        });
      });

      // 处理折叠按钮的点击事件，实现旋转
      foldButtons.forEach((foldButton) => {
        foldButton.addEventListener("click", () => {
          foldButton.classList.toggle("code-block-extension-fold"); // 切换折叠类名
          // 找到最近的 pre 标签
          const pre = foldButton.closest("pre");
          if (pre) {
            if (pre.style.paddingTop === "1em") {
              pre.style.paddingTop = "3em"; // 恢复原来的 padding
            } else {
              pre.style.paddingTop = "3em"; // 设置 padding 为 0
            }
          }

          // 在 pre 标签下找到 code 标签
          const code = pre?.querySelector("code");
          // 切换 code 标签的类名
          if (code) {
            code.classList.toggle("code-block-extension-fold");
          }

          // 在 pre 标签下找到 code-block-extension-header
          const headerElement = pre?.querySelector(".code-block-extension-header");

          // 切换 code-block-extension-header 的类名
          if (headerElement) {
            headerElement.classList.toggle("code-block-extension-fold");
          }
        });
      });
    },
  };
}
