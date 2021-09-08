"use strict";

const gulp = require("gulp");
const zip = require("gulp-zip");
const rename = require("gulp-rename");
const util = require("gulp-util");
const htmlmin = require("gulp-htmlmin");
const fs = require("fs");

module.exports = () => {
	gulp.task(
		"zip",
		gulp.series("build", "template", () => {
			return gulp
				.src("./dist/index.min.html")
				.pipe(htmlmin({ collapseWhitespace: true, removeAttributeQuotes: true }))
				.pipe(rename("index.html"))
				.pipe(zip("game.zip"))
				.pipe(gulp.dest("dist"));
		})
	);

	gulp.task(
		"report",
		gulp.series("zip", (done) => {
			fs.stat("./dist/game.zip", (err, data) => {
				if (err) {
					util.beep();
					return done(err);
				}
				util.log(util.colors.yellow.bold(`Current game size: ${data.size} bytes`));
				let percent = parseInt((data.size / 13312) * 100, 10);
				util.log(util.colors.yellow.bold(`${percent}% of total game size used`));
				done();
			});
		})
	);
};
