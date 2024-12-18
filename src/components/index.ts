/**
 * 布局组件
 * 这个文件作为组件的目录
 * 目的是统一管理对外输出的组件，方便分类
 */
import Footer from './Footer';
import { HeaderItem, SearchInput } from '@/components/Header';
import { AvatarDropdown, AvatarName } from './RightContent/AvatarDropdown';
import { MdViewer, MyMdEditor, TableOfContents } from '@/components/Markdown';
import { RecommendUser, SearchUserCard, UserAvatarCard, UserCard } from '@/components/ReUser';
import { TagTreeSelect } from '@/components/ReTag';
import { ActionTabbar, PostAvatarCard, PostCard, PostTitleCard } from '@/components/RePost';
import { ChartAvatarCard, ChartCard } from '@/components/ReChart';
import { CreateChartForm } from '@/components/ReGenerate';

export {
  Footer,
  SearchInput,
  HeaderItem,
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
  ChartCard,
  CreateChartForm,
  UserAvatarCard,
  SearchUserCard,
};
