
export default {
    updateImg(context){
        let url = 'https://api.apiopen.top/api/getImages?size=16'
        fetch(url)
            .then(res => res.json())
            .then(img => {
                let imgs = img.result.list
                context.commit('setImg', imgs)
            })
    }
}
