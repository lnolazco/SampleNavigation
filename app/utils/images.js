const avatar_repository = 'https://71ea.https.cdn.softlayer.net/8071EA/cdn/menu_thumbs/';
const profile_repository = 'https://71ea.https.cdn.softlayer.net/8071EA/cdn/photo-thumb/';
const galeries_repository = 'https://71ea.https.cdn.softlayer.net/8071EA/cdn/galeries/';
const noImage = 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg';

export function getImageSource(repository, name) {
    const uri = !name ? noImage : `${avatar_repository}${repository}/${name}`;

    return { uri };
}

export function getProfileImageSource(repository, name) {
    const uri = !name ? noImage : `${profile_repository}${repository}/${name}`;

    return { uri };
}

export function getGalleryImageSource(repository, name) {
    const uri = !name ? noImage : `${galeries_repository}${repository}/${name}`;

    return { uri };
}
