// package com.thalir.backend.controller;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;
// import com.thalir.backend.dto.StartPlanRequestDto;
// import com.thalir.backend.service.FarmerCropPlanService;
// @RestController
// @RequestMapping("/api")
// @CrossOrigin(origins = "*")
// public class FarmerCropPlanController {

//     @Autowired
//     private FarmerCropPlanService service;

//     @PostMapping("/start-plan")
//     public FarmerCropPlan startPlan(@RequestBody StartPlanRequestDto request) {
//         return service.savePlan(request);
//     }
// }


package com.thalir.backend.controller;

import com.thalir.backend.dto.StartPlanRequestDto;
import com.thalir.backend.model.FarmerCropPlan;
import com.thalir.backend.service.FarmerCropPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class FarmerCropPlanController {

    @Autowired
    private FarmerCropPlanService service;

    @PostMapping("/start-plan")
    public FarmerCropPlan startPlan(@RequestBody StartPlanRequestDto request) {
        return service.savePlan(request);
    }
}