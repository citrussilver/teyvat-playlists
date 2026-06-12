const getPlaylistCoverUrl = (playlist) => {
  if (!playlist) return null
  return playlist.imageLink || playlist.coverUrl || null
}

export default getPlaylistCoverUrl
