// https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.20&manage_type=myprojects&projectId=3146710&keyword=&project_type=&page=
import iconFont from '@/assets/icons/font_3146710_s4on0hqyjeg'
import nodeIcon from '@/assets/icons/font_2981956_mlh4qdjssyc.js'

import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl:iconFont
  // scriptUrl: '//at.alicdn.com/t/a/font_3146710_a0jqa3k8j79.css', // 在 iconfont.cn 上生成
});

export default IconFont;

export const NodeIcon = createFromIconfontCN({
  scriptUrl:nodeIcon
  // scriptUrl: 'https://at.alicdn.com/t/a/font_3146710_a0jqa3k8j79.js', // 在 iconfont.cn 上生成
});
