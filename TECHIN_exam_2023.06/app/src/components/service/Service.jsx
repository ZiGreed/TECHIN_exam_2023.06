import "./Service.css";

function Service({ services }) {
  const servicesjsx = services.map((service) => {
    return (
      <div className="service" key={service._id}>
        <div>
          <div className="text">
            <h2 className="title">{service.title}</h2>
            {/* <p className="category">{service.category}</p> */}
            <p className="description">{service.description}</p>
            <p className="price">{service.price} €</p>
          </div>
        </div>

        {service.image && <img src={`./images/${service.image}`} alt={service.title} />}
      </div>
    );
  });

  return <div className="servicejsx">{servicesjsx}</div>;
}

export default Service;
