import { db } from "../libs/db.js"

export const createPlaylist = async (req, res) => {
    try {
        const {name, description} = req.body
        const userId = req.user.id

        const playlist = await db.playlist.create({
            data:{
                name,
                description,
                userId,
            }
        })
        res.status(200).json({
            success:true,
            message:'Playlist created successfully.',
            playlist
        })
    } catch (error) {
        console.log('Error creating Playlist',error)
        res.status(500).json({
            error:'Failed to create Playlist.'
        })
    }
    
}

export const getAllListDetails = async (req, res) => {
    try {
        const playlists = await db.playlist.findMany({
            where:{
                userId: req.user.id
            },
            include:{
                problems:{
                    include:{
                        problem:true
                    }
                }
            }
        })
        res.status(200).json({
            success:true,
            message:'Playllist fethced successfully',
            playlists
        })
    } catch (error) {
        console.log('Error fetching all Playlist',error)
        res.status(500).json({
            error:'Failed to fetch Playlist.'
        })
    }
}

export const getPlaylistDetails = async (req, res) => {
    const {playlistId} = req.params
    try {
        const playlist = await db.playlist.findUnique({
            where:{
                id:playlistId,
                userId: req.user.id
            },
            include:{
                problems:{
                    include:{
                        problem:true
                    }
                }
            }
        })
        if(!playlist) {
            return res.status(404).json({
                error:'Playlist not found'
            })
        }
        res.status(200).json({
            success:true,
            message:'Playllist fethced successfully',
            playlist
        })
    } catch (error) {
        console.log('Error creating playlist', error)
        res.status(500).json({
            error:'Failed to create playlist..'
        })
    }
}

export const addProblemToPlaylist = async (req, res) => {
    const {playlistId} = req.params
    const {problemIds} = req.body
      try {
        if(!Array.isArray(problemIds) || problemIds.length === 0) {
            return res.status(400).json({
                error:'Invalid or missing problemIds.'
            })
        }
        const problemsInPlaylist = await db.problemsInPlaylist.createMany({
            data:problemIds.map((problemIds) => ({
                playlistId,
                problemIds
            }))
        })
        res.status(201).json({
            success: true,
            message: 'Problem added to playlist successfully.!',
            problemsInPlaylist
            
        })
      } catch (error) {
        console.log('Error adding problems Playlist',error)
        res.status(500).json({
            error:'Error adding problems Playlist'
        })
      }
}


export const deletePlaylist = async (req, res) => {
    const {playlistId} = req.params
    try {
        const deletePlaylist = await db.playlist.delete({
            where:{
                id:playlistId
            }
        })

        res.status(200).json({
            success:true,
            message: 'Playlist deleted successfully',
            deletePlaylist
        })
    } catch (error) {
        console.log('Error deleting problems Playlist',error)
        res.status(500).json({
            error:'Error deleting problems Playlist'
        })
    }
}
export const removeProblemFromPlaylist = async (req, res) => {
    
}