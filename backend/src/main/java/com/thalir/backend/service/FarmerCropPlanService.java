package com.thalir.backend.service;

import com.thalir.backend.dto.StartPlanRequestDto;
import com.thalir.backend.model.FarmerCropPlan;
import com.thalir.backend.repository.FarmerCropPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FarmerCropPlanService {

    @Autowired
    private FarmerCropPlanRepository repository;

    public FarmerCropPlan savePlan(StartPlanRequestDto request) {

        FarmerCropPlan plan = new FarmerCropPlan();

        plan.setFarmerName(request.getFarmerName());
        plan.setCropName(request.getCropName());
        plan.setProfit(request.getProfit());
        plan.setExpenses(request.getExpenses());

        return repository.save(plan);
    }
}