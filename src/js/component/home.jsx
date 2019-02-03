import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import bg from "../../img/bg.png";
import logo from "../../img/logo.png";
import qr from "../../img/qr.png";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			appname: "MedLingo",
			intl: {
				next: ["SIGUIENTE", "APRE SA", "NEXT"],
				back: ["ATRAS", "RETOUNEN", "BACK"],
				yes: ["Si", "Wi", "Yes"],
				no: ["No", "Non", "No"],
				name: ["Nombre", "Non", "Name"],
				email: ["Email", "Imèl", "Email"],
				gender: ["Sexo", "Sèks", "Gender"],
				male: ["Masculino", "Gason", "Male"],
				female: ["Femenino", "Fi", "Female"],
				other: ["Otro", "Lòt", "Other"],
				age: ["Edad", "Laj", "Age"],
				sendEmail: [
					"NOTIFICAME VIA EMAIL",
					"VOYE M 'YON IMÈL",
					"SEND ME AN EMAIL"
				],
				insurance: ["Seguro Medico", "Asirans", "Insurance"],
				insuranceProvider: [
					"Proveedor de Seguro",
					"Founisè asirans",
					"Insurance Provider"
				],
				symptoms: [
					"Sintomas Generales",
					"Jeneral Sentòm yo",
					"General Symptoms"
				],
				general: [
					"Marque todos los que apliquen",
					"Make tout sa ki aplike",
					"Mark all that apply"
				],
				allergies: ["Alergias", "Alèji", "Allergies"],
				additionalSymptoms: [
					"Diganos brevemente como se siente",
					"Yon ti tan di nou ki jan ou santi ou",
					"Briefly tell us how do you feel"
				],
				symptom1: ["Sintoma 1", "Sentòm yo 1", "Symptom 1"],
				symptom2: ["Sintoma 2", "Sentòm yo 2", "Symptom 2"],
				allergy1: ["Alergia 1", "Alèji 1", "Allergy 1"],
				allergy2: ["Alergia 2", "Alèji 2", "Allergy 2"]
			},
			currentLang: 0,
			patientLanguage: [
				{ id: "es", description: "Spanish" },
				{ id: "ht", description: "Creole" },
				{ id: "en", description: "English" }
			],
			currentStep: 0,
			patientName: "",
			patientEmail: "",
			patientGender: "O",
			patientAge: 18,
			additionalSymptoms: "",
			hasInsurance: false,
			insuranceProvider: "",

			insuranceProviders: [
				{
					name: "insurance1",
					description: "Insurance 1"
				},
				{
					name: "insurance2",
					description: "Insurance 2"
				}
			],

			generalSymptoms: [
				{
					name: "generalSymptom1",
					description: "Symptom 1",
					intlName: "symptom1"
				},
				{
					name: "generalSymptom2",
					description: "Symptom 2",
					intlName: "symptom2"
				}
			],
			symptomsSelected: [],

			allergies: [
				{
					name: "allergy1",
					description: "Allergy 1",
					intlName: "allergy1"
				},
				{
					name: "allergy2",
					description: "Allergy 2",
					intlName: "allergy2"
				}
			],
			allergiesSelected: [],

			locations: [
				{
					name: "MD Urgent Care",
					address: "9971 W Flagler St, Miami, FL",
					phone: "305-222-5793",
					latitude: "25.7702",
					longitude: "-80.3343"
				},
				{
					name: "Westchester Urgent Care",
					address: "2261 SW 40th St, Miami, FL",
					phone: "305-402-0078",
					latitude: "25.75900",
					longitude: "-80.3366"
				},
				{
					name: "Dadeland Urgent Care",
					address: "3567 SW 8th St, Miami, FL",
					phone: "305-657-5843",
					latitude: "25.7551",
					longitude: "-80.3366"
				}
			],

			translations: { additionalNotes: "" },
			loading: false
		};
	}

	prepareTranslations() {
		//prepare all translations before the summary view
		if (this.state.currentLang != 3) {
			this.executeTranslation(
				this.state.additionalSymptoms,
				this.state.patientLanguage[this.state.currentLang].id,
				"en",
				"additionalNotes"
			);

			this.executeTranslation(
				"Some useful keywords that might help you",
				"en",
				this.state.patientLanguage[this.state.currentLang].id,
				"usefulKeywords"
			);

			this.executeTranslation(
				"Please present the following to your healtcare Professional",
				"en",
				this.state.patientLanguage[this.state.currentLang].id,
				"presentToHP"
			);

			this.executeTranslation(
				"You will be properly assisted in any of the following locations",
				"en",
				this.state.patientLanguage[this.state.currentLang].id,
				"locations"
			);
		} else
			this.setState({
				translations: {
					additionalNotes: this.state.additionalSymptoms,
					usefulKeywords: "Some useful keywords that might help you",
					presentToHP:
						"Please present the following to your healtcare Professional",
					locations:
						"You will be properly assisted in any of the following locations"
				}
			});
	}

	executeTranslation(
		textToTranslate,
		sourceLanguage,
		targetLanguage,
		targetObject
	) {
		this.showPos();

		let APIkey = "AIzaSyCeoGOMOM2SnR4j3aKJZCLUN1JtXXT8u2E";
		let APIEndpoint =
			"https://translation.googleapis.com/language/translate/v2?key=" +
			APIkey;

		let data = {
			q: textToTranslate,
			target: targetLanguage,
			source: sourceLanguage
		};

		let translation = "ERROR HANDLING TRANSLATION";
		this.setState({ loading: false });

		fetch(APIEndpoint, {
			method: "POST", // or 'PUT'
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(response => {
				translation = response.data.translations[0].translatedText;
				let tempTranslations = this.state.translations;
				tempTranslations[targetObject] = translation;

				this.setState({
					translations: tempTranslations,
					loading: false
				});
			})
			.catch(error => {
				console.error("Error:", error);
			});
	}

	showPos() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			console.log("Geolocation is not supported by this browser.");
		}

		let locations = this.state.locations;

		function showPosition(position) {
			var latlon =
				position.coords.latitude + "," + position.coords.longitude;

			let points = "&markers=color:blue%7Clabel:Y%7C" + latlon;

			locations.forEach((newValue, index) => {
				points +=
					"&markers=color:red%7Clabel:" +
					(index + 1) +
					"%7C" +
					newValue.latitude +
					"," +
					newValue.longitude;
			});

			console.log(points);

			var img_url =
				"https://maps.googleapis.com/maps/api/staticmap?center=" +
				latlon +
				"&zoom=13&size=600x450" +
				points +
				"&key=AIzaSyDPBFaytDIXLmjA-mzShl75WQntcCG_oP4";

			document.querySelector("#map-card > img").src = img_url;
		}
	}

	render() {
		let cardResponsive = "col-12 col-md-10 col-lg-7 col-xl-6";

		if (this.state.currentStep == 0) {
			return (
				<div>
					<div id="map" />
					<script
						type="text/javascript"
						src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDPBFaytDIXLmjA-mzShl75WQntcCG_oP4&libraries=places&callback=initMap"
					/>
					<script>
						{` var map;
					      var service;
					      var infowindow;
					
					      function initMap() {
					        var sydney = new google.maps.LatLng(-33.867, 151.195);
					
					        infowindow = new google.maps.InfoWindow();
					
					        map = new google.maps.Map(
					            document.getElementById('map'), {center: sydney, zoom: 15});
					
					        var request = {
					          query: 'Museum of Contemporary Art Australia',
					          fields: ['name', 'geometry'],
					        };
					
					        service = new google.maps.places.PlacesService(map);
					
					        service.findPlaceFromQuery(request, function(results, status) {
					          if (status === google.maps.places.PlacesServiceStatus.OK) {
					            for (var i = 0; i < results.length; i++) {
					              createMarker(results[i]);
					            }
					
					            map.setCenter(results[0].geometry.location);
					          }
					        });
					      }
					
					      function createMarker(place) {
					        var marker = new google.maps.Marker({
					          map: map,
					          position: place.geometry.location
					        });
					
					        google.maps.event.addListener(marker, 'click', function() {
					          infowindow.setContent(place.name);
					          infowindow.open(map, this);
					        });
					      }`}
					</script>

					<div className="container">
						<div className="row justify-content-center">
							<div className={cardResponsive}>
								<div className="card top-card text-center">
									<h3 className="card-header border-0 card-title py-4 bg-white font-style-bold text-primary">
										<img src={logo} height="80" />
										<br />
										{this.state.appname}
									</h3>
									<div className="card-body">
										<p className="text-primary h5 mb-5">
											Hola! - Bonjou! - Hello!
										</p>
										<p className="font-bold h5 my-4">
											Seleccione su idioma preferido
										</p>
										<p className="font-bold h5 mb-4">
											Chwazi pwòp ou a preferans
										</p>
										<p className="font-bold h5 mb-5">
											Select your preferred language
										</p>

										<select
											className="custom-select mb-4"
											onChange={e =>
												this.setState({
													currentLang: e.target.value
												})
											}
											value={this.state.currentLang}>
											<option value="0">Espanol</option>
											<option value="1">Creole</option>
											<option value="2">English</option>
										</select>

										<button
											type="button"
											className="btn btn-primary"
											onClick={() =>
												this.setState({
													currentStep: 1
												})
											}>
											{
												this.state.intl.next[
													this.state.currentLang
												]
											}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} //if statement step 0

		if (this.state.currentStep == 1) {
			return (
				<div>
					<div className="container">
						<div className="row justify-content-center">
							<div className={cardResponsive}>
								<div className="card top-card text-center">
									<h5 className="card-header border-0 card-title py-4 bg-white">
										<img src={logo} height="80" />
									</h5>
									<div className="card-body">
										<form>
											<div className="form-group">
												<label
													htmlFor="patientName"
													className="font-weight-bold">
													{
														this.state.intl.name[
															this.state
																.currentLang
														]
													}
												</label>
												<input
													type="text"
													className="form-control"
													id="patientName"
													value={
														this.state.patientName
													}
													onChange={e =>
														this.setState({
															patientName:
																e.target.value
														})
													}
												/>
											</div>

											<div className="form-group">
												<label
													htmlFor="patientEmail"
													className="font-weight-bold">
													{
														this.state.intl.email[
															this.state
																.currentLang
														]
													}
												</label>
												<input
													type="email"
													className="form-control"
													id="patientEmail"
													value={
														this.state.patientEmail
													}
													onChange={e =>
														this.setState({
															patientEmail:
																e.target.value
														})
													}
												/>
											</div>

											<div className="form-group">
												<label
													htmlFor="patientGender"
													className="font-weight-bold">
													{
														this.state.intl.gender[
															this.state
																.currentLang
														]
													}
												</label>
												<select
													id="patientGender"
													className="custom-select"
													onChange={e =>
														this.setState({
															patientGender:
																e.target.value
														})
													}
													value={
														this.state.patientGender
													}>
													<option value="F">
														{
															this.state.intl
																.female[
																this.state
																	.currentLang
															]
														}
													</option>
													<option value="M">
														{
															this.state.intl
																.male[
																this.state
																	.currentLang
															]
														}
													</option>
													<option value="O">
														{
															this.state.intl
																.other[
																this.state
																	.currentLang
															]
														}
													</option>
												</select>
											</div>

											<div className="form-group">
												<label
													htmlFor="patientAge"
													className="font-weight-bold">
													{
														this.state.intl.age[
															this.state
																.currentLang
														]
													}
												</label>
												<input
													type="number"
													className="form-control"
													id="patientAge"
													value={
														this.state.patientAge
													}
													onChange={e =>
														this.setState({
															patientAge:
																e.target.value
														})
													}
												/>
											</div>

											<div className="form-group">
												<button
													type="button"
													className="btn btn-light mr-2"
													onClick={() =>
														this.setState({
															currentStep: 0
														})
													}>
													{
														this.state.intl.back[
															this.state
																.currentLang
														]
													}
												</button>
												<button
													type="button"
													className="btn btn-primary"
													onClick={() =>
														this.setState({
															currentStep: 2
														})
													}>
													{
														this.state.intl.next[
															this.state
																.currentLang
														]
													}
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} //if statement step 1

		if (this.state.currentStep == 2) {
			let providersCollection = this.state.insuranceProviders.map(
				provider => {
					return (
						<option value={provider.name} key={provider.name}>
							{provider.description}
						</option>
					);
				}
			);

			let generalSymptomsCollection = this.state.generalSymptoms.map(
				(symptom, index) => {
					return (
						<div
							className="custom-control custom-checkbox mb-3"
							key={symptom.name}>
							<input
								type="checkbox"
								className="custom-control-input"
								defaultChecked={this.state.symptomsSelected.includes(
									symptom.intlName
								)}
								id={symptom.intlName}
								onChange={e => {
									if (e.target.checked) {
										this.setState({
											symptomsSelected: this.state.symptomsSelected.concat(
												[e.target.id]
											)
										});
									} else {
										let tempSelected = this.state.symptomsSelected.filter(
											element =>
												element == e.target.id
													? false
													: true
										);
										this.setState({
											symptomsSelected: tempSelected
										});
									}
								}}
							/>
							<label
								className="custom-control-label"
								htmlFor={symptom.intlName}>
								{
									this.state.intl[symptom.intlName][
										this.state.currentLang
									]
								}
							</label>
						</div>
					);
				}
			);

			let allergiesCollection = this.state.allergies.map(
				(allergy, index) => {
					return (
						<div
							className="custom-control custom-checkbox mb-3"
							key={allergy.name}>
							<input
								type="checkbox"
								className="custom-control-input"
								defaultChecked={this.state.allergiesSelected.includes(
									allergy.intlName
								)}
								id={allergy.intlName}
								onChange={e => {
									if (e.target.checked) {
										this.setState({
											allergiesSelected: this.state.allergiesSelected.concat(
												[e.target.id]
											)
										});
									} else {
										let tempSelected = this.state.allergiesSelected.filter(
											element =>
												element == e.target.id
													? false
													: true
										);
										this.setState({
											allergiesSelected: tempSelected
										});
									}
								}}
							/>
							<label
								className="custom-control-label"
								htmlFor={allergy.intlName}>
								{
									this.state.intl[allergy.intlName][
										this.state.currentLang
									]
								}
							</label>
						</div>
					);
				}
			);

			return (
				<div>
					<div className="container">
						<div className="row justify-content-center">
							<div className={cardResponsive}>
								<div className="card top-card text-center">
									<h5 className="card-header border-0 card-title py-4 bg-white font-style-bold text-primary">
										<img src={logo} height="80" />
									</h5>
									<div className="card-body">
										<form>
											<label className="font-weight-bold">
												{
													this.state.intl.insurance[
														this.state.currentLang
													]
												}
											</label>
											<div className="mb-5">
												<div className="custom-control custom-radio custom-control-inline">
													<input
														type="radio"
														id="yesInsurance"
														name="patientHasInsurance"
														className="custom-control-input"
														defaultChecked={
															this.state
																.hasInsurance
														}
														onChange={() =>
															this.setState({
																hasInsurance: true,
																insuranceProvider: this
																	.state
																	.insuranceProviders[0]
																	.name
															})
														}
													/>
													<label
														className="custom-control-label"
														htmlFor="yesInsurance">
														{
															this.state.intl.yes[
																this.state
																	.currentLang
															]
														}
													</label>
												</div>
												<div className="custom-control custom-radio custom-control-inline">
													<input
														type="radio"
														id="noInsurance"
														name="patientHasInsurance"
														className="custom-control-input"
														defaultChecked={
															!this.state
																.hasInsurance
														}
														onChange={() =>
															this.setState({
																hasInsurance: false,
																insuranceProvider:
																	""
															})
														}
													/>
													<label
														className="custom-control-label"
														htmlFor="noInsurance">
														{
															this.state.intl.no[
																this.state
																	.currentLang
															]
														}
													</label>
												</div>
												<div>
													{this.state.hasInsurance ? (
														<div className="form-group pt-3">
															<label
																htmlFor="patientGender"
																className="font-weight-bold">
																{
																	this.state
																		.intl
																		.insuranceProvider[
																		this
																			.state
																			.currentLang
																	]
																}
															</label>
															<select
																id="patientGender"
																className="custom-select"
																onChange={e =>
																	this.setState(
																		{
																			insuranceProvider:
																				e
																					.target
																					.value
																		}
																	)
																}
																value={
																	this.state
																		.insuranceProvider
																}>
																{
																	providersCollection
																}
															</select>
														</div>
													) : (
														""
													)}
												</div>
											</div>

											<div
												id="accordion"
												className="mb-5">
												<label className="font-weight-bold">
													{
														this.state.intl.general[
															this.state
																.currentLang
														]
													}
												</label>
												<div className="card">
													<div
														className="card-header"
														id="headingOne">
														<h5 className="mb-0">
															<button
																className="btn btn-link"
																type="button"
																data-toggle="collapse"
																data-target="#collapseOne"
																aria-expanded="true"
																aria-controls="collapseOne">
																{
																	this.state
																		.intl
																		.symptoms[
																		this
																			.state
																			.currentLang
																	]
																}{" "}
																(
																{
																	this.state
																		.symptomsSelected
																		.length
																}
																)
															</button>
														</h5>
													</div>

													<div
														id="collapseOne"
														className="collapse"
														aria-labelledby="headingOne"
														data-parent="#accordion">
														<div className="card-body text-left">
															<div className="row">
																<div className="col-12 col-md-6">
																	{
																		generalSymptomsCollection
																	}
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="card">
													<div
														className="card-header"
														id="headingThree">
														<h5 className="mb-0">
															<button
																className="btn btn-link collapsed"
																data-toggle="collapse"
																type="button"
																data-target="#collapseThree"
																aria-expanded="false"
																aria-controls="collapseThree">
																{
																	this.state
																		.intl
																		.allergies[
																		this
																			.state
																			.currentLang
																	]
																}{" "}
																(
																{
																	this.state
																		.allergiesSelected
																		.length
																}
																)
															</button>
														</h5>
													</div>
													<div
														id="collapseThree"
														className="collapse"
														aria-labelledby="headingThree"
														data-parent="#accordion">
														<div className="card-body text-left">
															<div className="row">
																<div className="col-12 col-md-6">
																	{
																		allergiesCollection
																	}
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											<div className="form-group mb-4">
												<label
													htmlFor="patientSymptoms"
													className="font-weight-bold">
													{
														this.state.intl
															.additionalSymptoms[
															this.state
																.currentLang
														]
													}
												</label>
												<textarea
													className="form-control"
													id="patientSymptoms"
													rows="5"
													value={
														this.state
															.additionalSymptoms
													}
													onChange={e =>
														this.setState({
															additionalSymptoms:
																e.target.value
														})
													}
												/>
											</div>

											<div className="form-group">
												<button
													type="button"
													className="btn btn-light mr-2"
													onClick={() =>
														this.setState({
															currentStep: 1
														})
													}>
													{
														this.state.intl.back[
															this.state
																.currentLang
														]
													}
												</button>
												<button
													type="button"
													className="btn btn-primary"
													onClick={() => {
														this.setState({
															currentStep: 3,
															loading: true
														});
														this.prepareTranslations();
													}}>
													{
														this.state.intl.next[
															this.state
																.currentLang
														]
													}
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} //if statement step 2

		if (this.state.currentStep == 3) {
			let locationsResult = this.state.locations.map(location => {
				return (
					<li
						className="list-group-item"
						key={location.name.replace(/\s/g, "")}>
						<strong>{location.name}</strong>
						<br />
						{location.address}
						<br />
						{location.phone}
					</li>
				);
			});

			let symptoms = this.state.symptomsSelected.map((symptom, index) => {
				return (
					<span key={index}>
						{this.state.intl[symptom][2] +
							(index < this.state.symptomsSelected.length - 1
								? ", "
								: "")}
					</span>
				);
			});

			let allergies = this.state.allergiesSelected.map(
				(allergy, index) => {
					return (
						<span key={index}>
							{this.state.intl[allergy][2] +
								(index < this.state.allergiesSelected.length - 1
									? ", "
									: "")}
						</span>
					);
				}
			);

			let additionalNotes = this.state.translations.additionalNotes;

			let keywords =
				"This might be relevant Keywords based on Symptomps, Allergies and AI over the Patient notes, that should be included as the English version and its translation based on the patient language preference.";

			let translatedKeywords =
				"Basically same Keywords, but now presented to the patient, in reverse order, so the patient can identify some of them when communicating.";

			return (
				<div>
					<div className="container">
						<div className="row justify-content-center">
							<div className={cardResponsive}>
								<div className="card top-card text-center">
									<h5 className="card-header border-0 card-title py-4 bg-white">
										<img src={logo} height="80" />
									</h5>
									<div className="card-body">
										<div>
											<h5 className="text-primary">
												{
													this.state.translations
														.locations
												}
											</h5>
											<div className="text-center">
												<div
													className="card mb-4"
													id="map-card">
													<img
														className="card-img-top"
														src="..."
														alt="Card image cap"
													/>
													<ul className="list-group list-group-flush text-left">
														{locationsResult}
													</ul>
												</div>
											</div>
										</div>

										<div className="mb-4">
											<h5 className="text-primary">
												{
													this.state.translations
														.presentToHP
												}
											</h5>
											<p>
												Hi my name is&nbsp;
												{this.state.patientName}. I am
												using&nbsp;
												{this.state.appname} to
												communicate my healthcare needs.
												My primary language is&nbsp;
												{
													this.state.patientLanguage[
														this.state.currentLang
													].description
												}
												. Below is a summary of my
												symptoms and allergies.
											</p>

											<p>
												<strong>Symptoms:</strong>
												<br />
												{this.state.symptomsSelected
													.length > 0
													? symptoms
													: "None"}
											</p>

											<p>
												<strong>Allergies:</strong>
												<br />
												{this.state.allergiesSelected
													.length > 0
													? allergies
													: "None"}
											</p>

											<p>
												<strong>
													Additional Notes:
												</strong>
												<br />
												{this.state.additionalSymptoms
													.length > 0
													? additionalNotes
													: "None"}
											</p>

											<p>
												<strong>
													Useful keywords that might
													help:
												</strong>
												<br />
												<span className="text-muted">
													{keywords}
												</span>
											</p>

											<h5 className="text-primary mt-4">
												{
													this.state.translations
														.usefulKeywords
												}
											</h5>

											<p className="text-muted">
												{translatedKeywords}
											</p>

											<p>
												<img src={qr} height="100" />
											</p>

											<div className="form-group">
												<button
													type="button"
													className="btn btn-light mr-2"
													onClick={() =>
														this.setState({
															currentStep: 2
														})
													}>
													{
														this.state.intl.back[
															this.state
																.currentLang
														]
													}
												</button>
												<button
													type="button"
													className="btn btn-primary">
													{
														this.state.intl
															.sendEmail[
															this.state
																.currentLang
														]
													}
												</button>
											</div>
										</div>
									</div>
									{this.state.loading ? (
										<div className="loader" />
									) : (
										""
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} //if statement step 3
	}
}
