const utils = {
    statsLimits:{
    'Hp':{min: '5', max: '255'},
    'Height':{min: '20', max: '2000'},
    'Weight':{min: '0.1', max: '1000'},
    'Attack':{min: '5', max: '255'},
    'Special Attack':{min: '5', max: '255'},
    'Defense':{min: '5', max: '255'},
    'Special Defense':{min: '5', max: '255'},
    'Speed':{min: '5', max: '255'},
    },
    backgroundsByType: {
        bug: 'https://i.pinimg.com/originals/ac/a6/32/aca63286a9f3971bdd0fd1cb453e08fe.png',
        dark: 'https://pinposters.com/wp-content/uploads/2020/06/amoled-black-hole-wallpaper-715x715.jpg',
        dragon: 'https://img.freepik.com/free-vector/dark-cave-landscape_1308-16279.jpg',
        electric: 'https://t4.ftcdn.net/jpg/00/78/66/13/360_F_78661336_lJhntUBgIfUC21TuFgfMoTEvDQT5dBIE.jpg',
        fairy: 'http://cdn30.us1.fansshare.com/image/wallpaperbackground/blue-sky-background-hd-wallpapers-blue-1177767224.jpg',
        fighting: 'https://i2.wp.com/recommendmeanime.com/wp-content/uploads/2020/10/anime-tournements.jpg',
        fire: 'https://images2.alphacoders.com/282/thumb-1920-28242.jpg',
        flying: 'http://cdn30.us1.fansshare.com/image/wallpaperbackground/blue-sky-background-hd-wallpapers-blue-1177767224.jpg',
        ghost: 'https://pinposters.com/wp-content/uploads/2020/06/amoled-black-hole-wallpaper-715x715.jpg',
        grass: 'https://i.pinimg.com/originals/ac/a6/32/aca63286a9f3971bdd0fd1cb453e08fe.png',
        ground: 'https://img.freepik.com/free-vector/dark-cave-landscape_1308-16279.jpg',
        ice: 'https://cdn.dribbble.com/users/87294/screenshots/3119991/iceberg_800x600.jpg',
        normal:  'https://i2.wp.com/recommendmeanime.com/wp-content/uploads/2020/10/anime-tournements.jpg',
        poison: 'https://i.pinimg.com/originals/ac/a6/32/aca63286a9f3971bdd0fd1cb453e08fe.png',
        psychic: 'https://pinposters.com/wp-content/uploads/2020/06/amoled-black-hole-wallpaper-715x715.jpg',
        rock: 'https://img.freepik.com/free-vector/dark-cave-landscape_1308-16279.jpg',
        steel: 'https://img.freepik.com/free-vector/dark-cave-landscape_1308-16279.jpg',
        water: 'https://image.freepik.com/vector-gratis/fondo-mar-videoconferencias_52683-43441.jpg',
    },
    errorItems: function(newPokemon){
        const{statsLimits}=utils
        const {name,types,images, stats}=newPokemon
        let errors={}
        if(!name) errors.name = `a pokemon needs a name!`
        if (!types || types.length===0) errors.types = `at least one type must be selected.`
        if (!images || !images.front) errors.images = `at least a front image must be set.`
        let statsSum = 0
        for (let stat of Object.keys(statsLimits)){
            if (!stats|| !stats[stat] ||
                stats[stat]<statsLimits[stat].min ||
                 stats[stat]>statsLimits[stat].max){
                errors[stat] = `value must be between ${statsLimits[stat].min} and ${statsLimits[stat].max}.`
            }
            if (stats && stat!=="Height"&&stat!=="Weight"){
                statsSum += stats[stat]
            }
        }
        if (statsSum>600){
            errors['Total Stats']=`the sum of Hp, Attack, Special Attack, Defense, Special Defense and Speed must be equal to or less than 600.`
        }
        return(errors)
    }
}
export {utils}