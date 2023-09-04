const mysql=require("../../config/db");
const camelCase=require("../utils/camelcase");
class MusicModel {
    async getFilteredMusic(request){
        try{
            let query="select * from music where 1 ";
            const params=[];
            console.log(request);
            if(request.musicName){
                query+=`and music_name like ?`
                params.push(`%${request.musicName}%`);
            }
            if(request.tags){
                query+='and tags like ?'
                params.push(`%${request.tags}%`);
            }
            if(request.orderBy){
                query += ` ORDER BY ${request.orderBy} ${request.sequence === 'desc' ? 'DESC' : 'ASC'}`;
            }
            if (request.page && request.pageSize) {
                const offset = (request.page - 1) * request.pageSize;
                query += ' LIMIT ? OFFSET ?';
                params.push(Number(request.pageSize), Number(offset));
            }
            console.log(query,params);
            let [rows]=await mysql.query(query,params);
            rows=camelCase.convertToCamelCase(rows);
            console.log(rows)
            return rows;
        }catch (error){
            console.error('Error fetching filtered music:', error);
            throw new Error('An error occurred while fetching filtered music');
        }
    }
    async addMusicPlayCount(musicId){
        let query=`update music set listen_count=listen_count+1 where music_id= ? `;
        const params=[]
        params.push(musicId);
        mysql.query(query,params);
    }

    async addMusicLikeCount(musicId){
        let query=`update music set like_count=like_count+1 where music_id= ? `;
        const params=[]
        params.push(musicId);
        mysql.query(query,params);
    }
}

module.exports=MusicModel;

