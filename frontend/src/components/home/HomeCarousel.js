export default () => {
    const assetIds = ['569e5f21-f39f-4849-a891-d022cfc2b063', 'faf9e0ca-ca8b-4df9-9e1e-204a7e48e6e9', 'd9728ac6-0f60-4d31-8b79-0b104a588d1c'];

    return (
        <div className="home-carousel">
            {
                assetIds.map((assetId, i) => (
                    <img key={i} src={`https://storage.googleapis.com/marcofotoamateur-gallery/display/${assetId}.JPG`} />
                ))
            }
        </div>
    );
};