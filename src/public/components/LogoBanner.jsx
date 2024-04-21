import React from "react";

function LogoBanner({ logo, banner }) {
  const bannerLogoRef = React.useRef();
  const avatar = React.useRef();
  let [bannerLogoWidth, setBannerLogoWidth] = React.useState();

  const getBannerLogoWidth = () => {
    let w = bannerLogoRef.current.offsetWidth;
    setBannerLogoWidth(w);
    avatar.current.style.display = "inline-block";
    avatar.current.style.position = "relative";
    avatar.current.style.top = `-${w / 7}px`;
    avatar.current.style.left = `${w / 16}px`;
    bannerLogoRef.current.style.marginBottom = `-${w / 7}px`;
  };

  React.useEffect(() => {
    window.addEventListener("resize", getBannerLogoWidth);

    getBannerLogoWidth();

    return () => {
      window.removeEventListener("resize", getBannerLogoWidth);
    };
  }, []);

  const loadImgErr = () => {
    if (typeof this.state.imageFile !== "object") this.setState({ imageFile: null });
  };

  return (
    <div className="d-flex flex-column w-100 mtz-gap-20">
      <div className="bg-white mtz-rounded-16 w-100 mtz-gap-20 pb-2 d-flex flex-column">
        <div ref={bannerLogoRef} className="w-100">
          <div className="w-100">
            <div className="d-flex align-items-center justify-content-center">
              {banner ? (
                <img
                  style={{ borderRadius: "16px 16px 0 0" }}
                  className={"h-100 mw-100 mh-100 " + this.props.className}
                  src={banner}
                  onError={loadImgErr}
                />
              ) : (
                <img
                  className={"h-100 mw-100 mh-100"}
                  src={"/assets/images/empty_banner1.png"}
                  style={{ borderRadius: "16px 16px 0 0" }}
                />
              )}
            </div>
          </div>
          <div className="d-flex" ref={avatar}>
            <div className="rounded-circle shadow-sm bg-light">
              <div className="d-flex align-items-center justify-content-center">
                {logo ? (
                  <img
                    className={"rounded-circle mw-100 mh-100 shadow-sm "}
                    src={logo}
                    onError={loadImgErr}
                  />
                ) : (
                  <img
                    className={"rounded-circle mw-100 mh-100 shadow-sm "}
                    src={"/assets/images/empty_logo.png"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoBanner;
