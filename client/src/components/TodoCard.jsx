export function TodoCard({ data, handleEdit, handleDelete }) {
    const { _id, title, description, createdOn } = data;

    return (
        <li>
            <div className="title-description">
                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
                <p className="date">{createdOn}</p>
            </div>
            <div className="btn-container">
                <button>
                    <img src="/edit-icon.png" alt="" name={_id} onClick={handleEdit} />
                </button>
                <button>
                    <img src="/delete-icon.png" alt="" name={_id} onClick={handleDelete} />
                </button>
            </div>
        </li>
    );
}
