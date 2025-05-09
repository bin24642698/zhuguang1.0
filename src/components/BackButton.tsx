'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface BackButtonProps {
  href?: string;
  backPath?: string;
}

/**
 * 统一回退按钮组件
 *
 * 实现了应用内统一的回退逻辑：
 * - 回退到上一个功能界面，而不是浏览器的上一个页面
 * - 最终回退到首页（小说创作页面）
 * - 基于当前路径决定回退到哪个页面
 *
 * 回退逻辑：
 * 1. 从作品列表(/works)回退到首页(/)
 * 2. 从作品详情(/works/*)回退到作品列表(/works)
 * 3. 从提示词管理(/prompts)回退到首页(/)
 * 4. 从提示词详情或创建页面(/prompts/*)回退到提示词管理(/prompts)
 * 5. 从角色相关页面(/character/*)回退到首页(/)
 * 6. 其他页面均回退到首页(/)
 */
export default function BackButton({ href, backPath }: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    // 如果提供了明确的href，则导航到指定路径
    if (href) {
      router.push(href);
      return;
    }

    // 如果提供了明确的backPath，则导航到指定路径
    if (backPath) {
      router.push(backPath);
      return;
    }

    // 确保pathname不为null
    if (!pathname) {
      router.push('/');
      return;
    }

    // 根据当前路径决定回退到哪个页面
    if (pathname === '/works') {
      // 从作品列表回退到首页
      router.push('/');
    } else if (pathname.startsWith('/works/')) {
      // 从作品详情回退到作品列表
      router.push('/works');
    } else if (pathname === '/prompts') {
      // 从提示词仓库回退到首页
      router.push('/');
    } else if (pathname === '/booktool') {
      // 从拆书工具回退到首页
      router.push('/');
    } else if (pathname === '/prompts/type/book_tool') {
      // 从一键拆书提示词页面回退到提示词仓库
      router.push('/prompts');
    } else if (pathname.startsWith('/prompts/')) {
      // 从提示词详情或创建页面回退到提示词仓库
      router.push('/prompts');
    } else if (pathname.startsWith('/character/')) {
      // 从角色详情回退到首页
      router.push('/');
    } else {
      // 其他情况，回退到首页
      router.push('/');
    }
  };

  return (
    <button
      className="p-2 mr-3 hover:bg-[rgba(90,157,107,0.15)] rounded-full transition-colors duration-200 flex items-center justify-center"
      onClick={handleClick}
      aria-label="返回"
    >
      <span className="material-icons text-primary-green">arrow_back</span>
    </button>
  );
}