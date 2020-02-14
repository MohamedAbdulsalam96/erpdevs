// Copyright (c) 2020, One FM and contributors
// For license information, please see license.txt

frappe.ui.form.on('ERF Operational Requirements', {
	refresh: function(frm) {
		if(frm.doc.workflow_state === "Approved"){
			frm.add_custom_button(__("Complete Operational Requirments"), function(){
				var doc = frappe.model.get_new_doc("ERF Job Opening");
				frappe.route_options = frm.doc;
				frappe.set_route("Form", doc.doctype, doc.name);
			}).addClass("btn-primary");
		}
		var option = frappe.route_options;
		if(option){
			var designation = option.designation;
			if(designation){
				frappe.call({
					"method": "erpdevs.erpdevs.doctype.erf_operational_requirements.erf_operational_requirements.get_designation_data",
					"args": {"designation": designation},
					"callback": function(r){
						var skills = r.message[0];
						var profile = r.message[1];
						add_skills(skills, frm);
						add_profile(profile, frm);
					}
				});
			}
		}
	}
});

function add_skills(skills, frm){
	if(skills && !frm.doc.basic_key_skills){
		var parent = frm.doc;
		for(var i=0;i<skills.length;i++){
			var child = frappe.model.get_new_doc("Basic Key Skills", parent, "basic_key_skills");
			$.extend(child, {
				"skills": skills[i].skill
			});
		}
		frm.refresh_field("basic_key_skills");
	}
}

function add_profile(profile, frm){
	if(profile && !frm.doc.performance_profile){
		var parent = frm.doc;
		for(var i=0; i<profile.length;i++){
			var child = frappe.model.get_new_doc("Performance Profile", parent, "performance_profile");
			$.extend(child, {
				"objective_type": profile[i].objective_type,
				"objective": profile[i].objective,
				"objective_definition": profile[i].objective_definition,
				"days": profile[i].days
			});
		}
		frm.refresh_field("performance_profile");
	}
}
