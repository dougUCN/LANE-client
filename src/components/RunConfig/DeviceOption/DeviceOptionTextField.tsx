import { TextField } from "components/shared";
import useStateFromProps from "hooks/useStateFromProps";

type Props = {
  savedValue?: string[] | null;
};

const DeviceOptionTextField = ({ savedValue }: Props) => {
  const valueFromProps = savedValue && savedValue.length ? savedValue[0] : "";

  const [value, setValue] = useStateFromProps(valueFromProps);

  return (
    <TextField
      className="my-2"
      type="text"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value)
      }
      value={value}
    />
  );
};

export default DeviceOptionTextField;
