import { useState } from 'react';
import './PictureEditor.scss';

export default ({ picture, onUpdateRequested }) => {
    const [title, setTitle] = useState(picture.title);

    const hasTitleUpdate = () => (
        (!title && picture.title)
        || (title && !picture.title)
        || (title !== picture.title && picture.title)
    );

    return (
        <div className="picture-editor container">
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
            </div>
        </div>
    );
};