import { indianStates, twelfthStreams } from "./Dummydata";

const twelfthDropDownData = [
  {
    label: "Stream",
    placeholder: "Select a stream",
    name: "twelfth.stream",
    data: twelfthStreams.map((stream) => stream.name),
  },
  {
    label: "State",
    placeholder: "Select a state",
    name: "twelfth.state",
    data: indianStates.map((state) => state.name),
  },
];

export { twelfthDropDownData };
