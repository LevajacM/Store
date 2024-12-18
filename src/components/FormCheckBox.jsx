const FormCheckBox = ({ label, name, size, defaultValue }) => {
  return (
    <div className='form-control'>
      <label
        htmlFor={name}
        className='label cursor-pointer flex flex-col gap-2'
      >
        <span className='label-text capitalize'>{label}</span>
        <input
          type='checkbox'
          name={name}
          defaultChecked={defaultValue}
          className={`checkbox checkbox-primary ${size}`}
        />
      </label>
    </div>
  );
};

export default FormCheckBox;
