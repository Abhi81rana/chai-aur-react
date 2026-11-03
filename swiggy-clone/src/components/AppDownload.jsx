
import React from "react";

function AppDownload() {
  return (
    <section className="app-download" id="offers">

      <div className="phone-mockup">
        <div className="phone">
          <h2>Swiggy</h2>
          <p>Food delivery</p>
          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
            alt="Pizza"
          />
          <h4>Delicious food awaits!</h4>
        </div>
      </div>

      <div className="download-content">
        <h2>Get the Swiggy App</h2>

        <p>
          Experience food delivery like never before.
          Order food, track deliveries and enjoy exciting offers.
        </p>

        <div className="store-buttons">
          <a
            href="https://play.google.com/store/apps/details?id=in.swiggy.android"
            target="_blank"
            rel="noreferrer"
          >
            Google Play
          </a>

          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noreferrer"
          >
            App Store
          </a>
        </div>
      </div>

    </section>
  );
}

export default AppDownload;
