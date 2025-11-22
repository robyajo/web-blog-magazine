import React from 'react'

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
}

const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const usePosts = async (): Promise<{ posts: Post[] } | undefined> => {
  try {
    const response = await fetch(`${api}/api/dummy/posts`, {
        cache: 'no-store'
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const data = await response.json();
    return data.data; // Assuming the API returns { data: { posts: [...] } } or similar. Based on DummyController, it returns { message, data: ... }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return undefined;
  }
}
export const usePostsPopuler = async (): Promise<{ posts: Post[] } | undefined> => {
  try {
    const response = await fetch(`${api}/api/dummy/posts`, {
        cache: 'no-store'
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const data = await response.json();
    // Assuming data.data contains { posts: [...] }
    if (data.data && Array.isArray(data.data.posts)) {
        return {
            ...data.data,
            posts: data.data.posts.slice(0, 3)
        };
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return undefined;
  }
}

export const usePostsId = async (id: number): Promise<Post | undefined> => {
  try {
    const response = await fetch(`${api}/api/dummy/posts/${id}`, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch post ${id}: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return undefined;
  }
}