function Button({ style, text, onClick, type }) {
  const animationTags = "transition-colors duration-200 ease-in-out";
  const normalTags = "rounded-md text-sm px-4 py-2";
  const largeTags = "rounded-lg font-medium py-3";

  const primaryColorTags = "bg-orange-300 text-white hover:bg-orange-400";
  const acceptColorTags = "bg-green-300 text-white hover:bg-green-400";
  const secondaryColorTags = "bg-gray-100 text-gray-600 hover:bg-gray-200";
  const cancelColorTags = "bg-red-50 text-red-600 hover:bg-red-100";

  switch (style) {
    case "primary-large":
      return (
        <button
          onClick={onClick}
          type={type}
          className={largeTags + " " + primaryColorTags + " " + animationTags}
        >
          {text}
        </button>
      );
    case "primary":
      return (
        <button
          onClick={onClick}
          type={type}
          className={normalTags + " " + primaryColorTags + " " + animationTags}
        >
          {text}
        </button>
      );
    case "secondary":
      return (
        <button
          onClick={onClick}
          type={type}
          className={
            normalTags + " " + secondaryColorTags + " " + animationTags
          }
        >
          {text}
        </button>
      );
    case "accept":
      return (
        <button
          onClick={onClick}
          type={type}
          className={normalTags + " " + acceptColorTags + " " + animationTags}
        >
          {text}
        </button>
      );
    case "cancel":
      return (
        <button
          onClick={onClick}
          type={type}
          className={normalTags + " " + cancelColorTags + " " + animationTags}
        >
          {text}
        </button>
      );
  }
}

export default Button;
