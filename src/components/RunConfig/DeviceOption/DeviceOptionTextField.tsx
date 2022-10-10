import { TextField } from "components/shared";
import useStateFromProps from "hooks/useStateFromProps";

type Props = {
  savedValue?: string[] | null;
  label: string;
};

const DeviceOptionTextField = ({ savedValue, label }: Props) => {
  const valueFromProps = savedValue && savedValue.length ? savedValue[0] : "";

  const [value, setValue] = useStateFromProps(valueFromProps);

  return (
    <TextField
      className="my-2 max-w-fit"
      type="text"
      label={label}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value)
      }
      value={value}
    />
  );
};

export default DeviceOptionTextField;
