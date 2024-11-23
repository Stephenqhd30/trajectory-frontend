/**
 * 布局组件
 * 这个文件作为组件的目录
 * 目的是统一管理对外输出的组件，方便分类
 */
import Footer from './Footer';
import { SearchInput } from '@/components/Header';
import { AvatarDropdown, AvatarName } from './RightContent/AvatarDropdown';
import { MdViewer, MyMdEditor, TableOfContents } from '@/components/Markdown';
import { RecommendUser, UserCard } from '@/components/ReUser';
import { TagTreeSelect } from '@/components/ReTag';
import { ActionTabbar, PostAvatarCard, PostCard, PostTitleCard } from '@/components/RePost';
import { ChartAvatarCard } from '@/components/ReChart';

export {
  Footer,
  SearchInput,
  AvatarDropdown,
  AvatarName,
  MdViewer,
  MyMdEditor,
  TableOfContents,
  TagTreeSelect,
  PostCard,
  ActionTabbar,
  RecommendUser,
  UserCard,
  PostAvatarCard,
  PostTitleCard,
  ChartAvatarCard,
};
