/* eslint-disable react/prop-types */


const Card = ({ image, title, onClick }) => {
    return (
    <div className="card" onClick={onClick}>
        <img src={image} alt={title} className="card-image" />
        <h2 className="card-title">{title}</h2>
        <div className="card-overlay">
            <i className="fas fa-question-circle" />
        </div>
    </div>
    );
};


export default Card;