function Card({ src, title, Desc }) {
    return (
        <div className='h-80 border rounded-xl bg-neutral-100 w-72'>
            <div>
                <img className="object-cover h-52 w-full" src={src} alt="" />
            </div>

            <div className="line w-full border"></div>

            <div className="info pt-3 pl-2">
                <h4 className="font-bold text-start pl-1 pb-1 text-sky-600">{title}</h4>
                <p className="text-start pl-1 font-semibold">{Desc}</p>
            </div>
        </div>
    )
}

export default Card;