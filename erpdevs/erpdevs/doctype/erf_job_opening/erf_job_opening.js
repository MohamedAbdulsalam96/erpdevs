// Copyright (c) 2020, One FM and contributors
// For license information, please see license.txt

frappe.ui.form.on('ERF Job Opening', {
	refresh: function(frm){
		var option = frappe.route_options;
		if(option){
			var erf = option.erf_reference;
			frappe.model.get_value("Employee Requisition Form", {"name": erf}, "designation", function(r){
				if(r){
					frm.set_value("designation", r.designation);
					frm.set_value("erf_number", erf);
					frappe.call({
						"method": "frappe.client.get",
                        "args": {
                                "doctype": "Designation",
                                "name": r.designation
                        },
                        "callback": function(re){
                                console.log(designation);
                                add_skills(re["skills"], frm);
                        }
                });
				}
			});
		}
	},

	designation: function(frm){
		let designation = frm.doc.designation;

		frappe.call({
			"method": "frappe.client.get",
			"args": {
				"doctype": "Designation",
				"name": designation
			},
			"callback": function(r){
				console.log(designation);
				add_skills(r["skills"], frm);
			}
		});
	}
});


function add_skills(skills,frm){
	if(skills && !frm.doc.basic_key_skills){
		var parent = frm.doc;
		for(var i=0;i<skills.length;i++){
			var child = frappe.model.get_new_doc("Basic Key Skills", parent, "basic_key_skills");
			$.extend(child, {
				"skills": skills[i].skill
			});
		}
		frm.refresh_field("basic_key_skills");
		// frm.save();
	}
}
