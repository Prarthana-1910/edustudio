# Finite Element Analysis & Long-Term Creep in Precast Segmental Girders

**Field Investigation Log:** SEC A-A / STA 14+280  
**Research Lead:** Structural Integrity Group in collaboration with Jacobs Engineering  
**Peer Reviewed:** Transp. Res. Rec. Vol. 2688  

## Abstract
Segmental prestressed box girder bridges represent one of the most structurally efficient solutions for medium-to-long span viaducts in high-density urban transit corridors. However, time-dependent phenomena—specifically concrete creep, tendon relaxation, and differential temperature gradients—generate secondary stress redistributions that often diverge from linear elastic 2D beam predictions. 

This paper synthesizes empirical strain gauge monitoring from the Metro Blue Line Viaduct (STA 12+100 to 18+600) with a non-linear 3D shell and tendon discretization model implemented in DIANA FEA.

```
       [Top Flange - 320mm Precast Slab]
    ┌─────────────────────────────────────┐
    │  === O == O ===  === O == O ===     │  <- Internal 19-strand tendons
    └───┬─────────────────────────────┬───┘
        │                             │
        │   Web Wall                  │ Web Wall
        │   (350mm thick)             │ (350mm thick)
        │                             │
    ┌───┴─────────────────────────────┴───┐
    │       === O ===     === O ===       │  <- Continuity cables
    └─────────────────────────────────────┘
```

## 1. Geometric Discretization and Material Formulations
The investigated superstructures consist of single-cell trapezoidal boxes with a constant depth of 3.20m across the 54m typical spans. Concrete compressive strength was specified at $f'_{c} = 55\text{ MPa}$ at 28 days with an elastic modulus $E_c = 36.5\text{ GPa}$.

### 1.1 Creep Compliance Function
The time-dependent compliance function $J(t, t_0)$ was modeled following the **fib Model Code 2010** formulation:

$$J(t, t_0) = \frac{1}{E_c(t_0)} + \frac{\phi(t, t_0)}{E_{ci}}$$

Where:
- $\phi(t, t_0)$ represents the creep coefficient evaluated at duration $t - t_0$.
- $E_{ci}$ is the modulus at 28 days ($1.05 \times E_c$).
- Mean relative humidity was benchmarked at $H = 68\%$ under ambient microclimate conditions.

## 2. In-Situ Optical Fiber Bragg Grating (FBG) Telemetry
Over 148 embedded Fiber Bragg Grating (FBG) optical sensors were affixed to prestressing ducts prior to the concrete pour at Pier 14. 

Key observations after 720 days of operational service:
1. **Mid-span Camber Loss:** Actual deflections exceeded initial AASHTO standard multipliers by approximately $14.2\%$, primarily driven by sustained early-age thermal loading during summer curing.
2. **Stress Redistribution at Diaphragms:** Secondary restraint moments generated a compressive surplus of $2.4\text{ MPa}$ near the pier cap re-entrant corners, verifying the requirement for diagonal shear rebar re-detailing.
3. **Friction Losses:** Wobble friction coefficients $k$ were measured at $0.0018\text{ rad/m}$, matching expected galvanized duct benchmarks.

## 3. Conclusions & Campus-Corporate Recommendations
For future heavy-rail viaduct projects designed by student-industry joint teams:
- Deploy 3D time-step integration rather than lumped age-adjusted effective modulus methods (AEMM) when spans exceed 50m.
- Specify internal duct grouting inspection via ultrasonic pulse-echo tomography within 96 hours post-tensioning.
- Incorporate solar radiation differential thermal gradient profiles into the longitudinal stress envelopment calculations.
