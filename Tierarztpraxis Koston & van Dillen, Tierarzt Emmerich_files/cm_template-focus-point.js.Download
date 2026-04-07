/**
 * @brief focus point backward compatibility
 *
 * This class/object ensures backward compatibility with auto covering of keyvisuals and logos until Sites 3.1.
 *
 * private
 */
__cm_template_focus_point_backward_compatibility = {

	/* private */
	_isAbsoluteKVPosition: function(x, y) {
		var isRelative = function(val) {
			return val.match(/%$/) || val == "auto";
		};
		return !isRelative(x) && !isRelative(y);
	},

	/* private */
	_hasSizeConfig: function(size) {
		return size && size != "auto" && size != "auto auto";
	},

	/* private */
	_applyDeprecatedKVClass(elem) {
		var style = window.getComputedStyle(elem);
		if (style && (!this._hasSizeConfig(style.backgroundSize) || this._isAbsoluteKVPosition(style.backgroundPositionX, style.backgroundPositionY))) {
			elem.classList.add('cm-templates-kv-deprecated-px');
		}
	},

	/* private */
	_applyDeprecatedLogoClass(elem) {
		var style = window.getComputedStyle(elem);
		if (style && (this._isAbsoluteKVPosition(style.backgroundPositionX, style.backgroundPositionY))) {
			elem.classList.add('cm-templates-logo-deprecated-px');
		}
	},

	/**
	 * @brief backward compatibility for px values in logo/kv
	 */
	ensure_focus_point_backward_compatibility: function() {
		var kvDiv = document.querySelector(".cm-kv-0");
		var slideDivs = kvDiv.querySelectorAll(".cm-slides-addon");
		if (slideDivs.length > 0) {
			/* slide show */
			for (var i = 0; i < slideDivs.length; i++) {
				this._applyDeprecatedKVClass(slideDivs[i]);
			}
		} else {
			/* kv */
			this._applyDeprecatedKVClass(kvDiv);
		}
		var logoDiv = document.querySelector(".cm-logo");
		if (logoDiv) {
			this._applyDeprecatedLogoClass(logoDiv);
		}
	}
};

/*
 * @see https://www.sitepoint.com/jquery-document-ready-plain-javascript/
 */
(function() {

	/**
	 * @brief DOM ready handler
	 *
	 * This handler is called when the DOM has fully been loaded.
	 * Functions that do template initializations can be added here.
	 */
	var __cm_template_init = function() {
		/* add function invocations here */
		__cm_template_focus_point_backward_compatibility.ensure_focus_point_backward_compatibility();
	};

	/* The callback will not be executed if the event has already been fired. So we make sure the callback is always run. */
	if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
		__cm_template_init();
		return;
	}

	/* register callback */
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', __cm_template_init, false);
	} else if (document.attachEvent) {
		/* older IE versions */
		document.attachEvent("onreadystatechange", function() {
			// check if the DOM is fully loaded
			if (document.readyState === "complete") {
				// remove the listener, to make sure it isn't fired in future
				document.detachEvent("onreadystatechange", arguments.callee);
				// call the actual handler
				__cm_template_init();
			}
		});
	}
})();
