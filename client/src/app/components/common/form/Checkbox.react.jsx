const Checkbox = ({
	id = uuid(),
	checked,
	className = '',
	disabled = false,
	children,
	onChange = null,
}) =>
	<div
		id={id}
		className={`checkbox ${className}`}
		onClick={() => {
			if (!disabled && onChange) onChange(!checked);
		}}
	>
		<input type='checkbox' checked={checked} onChange={() => {}} />

		<div className='checkbox__outer'>{checked && <div className='checkbox__inner' />}</div>

		{children && <div className='checkbox__label'>{children}</div>}
	</div>;

export default Checkbox;
