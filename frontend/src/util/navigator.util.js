export const buildAlbumOverviewPath = (albumId) => `/albums/${albumId}`;

export const buildWatchAlbumPath = (albumId, initialPicture) => `/albums/${albumId}/watch?picture=${initialPicture.assetId}`;

