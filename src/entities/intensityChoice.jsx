export function IntensityChoice(props) {

    return(
        <div className="radio">
            <div className="radio__wrapper" onClick={() => {
                props.setChosenIntensity(props.name)
            }}>
                <input name="activity" type="radio"
                       checked={props.chosenIntensity === props.name} required />
                <label>
                    {props.name}
                </label>
            </div>
            <p className="radio__description">
                {props.description}
            </p>
        </div>
    )
}