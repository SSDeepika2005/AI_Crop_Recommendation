package com.thalir.backend.repository;

import com.thalir.backend.model.FarmerCropPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FarmerCropPlanRepository extends JpaRepository<FarmerCropPlan, Long> {
}