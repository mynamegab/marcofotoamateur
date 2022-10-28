import { useState } from 'react';
import { addPictureOfTheMoment, removePictureOfTheMoment } from '../api/albums';
import './PictureEditor.scss';

export default ({ picture, onUpdateRequested, updatePicturesOfTheMoment, homepage }) => {
    const [title, setTitle] = useState(picture.title);

    const hasTitleUpdate = () => (
        (!title && picture.title)
        || (title && !picture.title)
        || (title !== picture.title && picture.title)
    );

    const isPictureOfThemoment = !!homepage.picturesOfTheMoment.find(pictureOfTheMoment => pictureOfTheMoment.pictureId === picture._id);

    return (
        <div className={`picture-editor container ${isPictureOfThemoment ? 'picture-of-the-moment' : ''}`}>
            <div className="picture-thumbnail">
                <img src={`https://storage.googleapis.com/marcofotoamateur-gallery/thumbnails/${picture.assetId}.${picture.format}`} />
            </div>
            <div className="picture-editor__actions-container">
                <div className="labeled-container">
                    <label>Title:</label>
                    <input value={title} onChange={(event) => setTitle(event.target.value)}/>
                    {hasTitleUpdate() && (
                        <span
                            className="material-symbols-outlined checkmark"
                            onClick={() => onUpdateRequested({ title })}
                        >
                            done
                        </span>
                    )}
                </div>

                <div className="labeled-container">
                    <label>Toggle visibility:</label>
                    <button onClick={() => onUpdateRequested({ hidden: !picture.hidden })}>
                        {picture.hidden ? "Show" : "Hide"}
                    </button>
                </div>

                
                <button onClick={async () => {
                    if (isPictureOfThemoment) {
                        const updatedList = await removePictureOfTheMoment(picture._id);
                        updatePicturesOfTheMoment(updatedList);
                    } else {

                        const updatedList = await addPictureOfTheMoment(picture._id);
                        updatePicturesOfTheMoment(updatedList);
                    }
                }}>
                    {
                    isPictureOfThemoment
                        ? "Remove from pictures of the moment"
                        : "Add to pictures of the moment"
                    }
                </button>
            </div>
        </div>
    );
};