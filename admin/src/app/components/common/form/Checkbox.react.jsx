const Checkbox = ({
	id = uuid(),
	checked,
	className = '',
	disabled = false,
	children = null,
	label = null,
	onChange = null,
}) =>
	<div
		id={id}
		className={`checkbox ${className}`}
		onClick={() => {
			if (!disabled && onChange) onChange(!checked);
		}}>

		<input type='checkbox' checked={checked} onChange={() => {}} />

		<div className={`checkbox__outer ${checked && 'checkbox__outer--active'}`}>
			{checked && <div className='checkbox__inner' />}
		</div>

		{(label || children) && <div className='checkbox__label'>{label || children}</div>}
	</div>;

export default Checkbox;
