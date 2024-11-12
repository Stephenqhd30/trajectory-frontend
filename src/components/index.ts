/**
 * 布局组件
 * 这个文件作为组件的目录
 * 目的是统一管理对外输出的组件，方便分类
 */
import Footer from './Footer';
import { AvatarDropdown, AvatarName } from './RightContent/AvatarDropdown';
import { MdEditor, MdViewer, TableOfContents } from '@/components/Markdown';
import { RecommendUserCard, UserAvatarCard } from '@/components/ReUser';
import { TagTreeSelect } from '@/components/ReTag';
import { ActionTabbar, PostCard } from '@/components/RePost';

export {
  Footer,
  AvatarDropdown,
  AvatarName,
  MdViewer,
  MdEditor,
  TableOfContents,
  UserAvatarCard,
  TagTreeSelect,
  PostCard,
  ActionTabbar,
  RecommendUserCard,
};
