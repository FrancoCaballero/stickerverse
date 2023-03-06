import { supabase } from './supabase'

export async function addSticker ({ userId, publicId, name, width, height }) {
  const newSticker = { user_id: userId, public_id: publicId, name, width, height }
  const { data, error } = await supabase.from('stickers').insert(newSticker)

  if (error) {
    throw error
  } else {
    return data
  }
}

export async function findStickersByUserId ({ userId }) {
  const { data, error } = await supabase.from('stickers').select('*').eq('user_id', userId)

  if (error) {
    throw error
  } else {
    return data
  }
}
