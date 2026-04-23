<?php

use App\Http\Controllers\Dashboard\CompanyProfileController;
use App\Http\Controllers\Dashboard\CorePrincipleController;
use App\Http\Controllers\Dashboard\EngineeringController;
use App\Http\Controllers\Dashboard\HeaderController;
use App\Http\Controllers\Dashboard\LearnMoreController;
use App\Http\Controllers\Dashboard\LegacyController;
use App\Http\Controllers\Dashboard\MissionVisionController;
use App\Http\Controllers\Dashboard\PhilosophyController;
use App\Http\Controllers\Dashboard\PricingPhilosophyController;
use App\Http\Controllers\Dashboard\ServiceController;
use App\Http\Controllers\Dashboard\SolutionController;
use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\Dashboard\WhyChooseUsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\View\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class,'index'])->name('home');
Route::get('/learn-more', [HomeController::class,'learnMore'])->name('learn');
Route::get('/know-more', [HomeController::class,'knowmore']) -> name('know-more');
Route::get('/our-company', [HomeController::class, 'about']) -> name('about');
Route::get('/solutions', [HomeController::class, 'solutions']) -> name('solutions');
Route::get('/contact', [HomeController::class, 'contact']) -> name('contact');
Route::get('/Brands', [HomeController::class, 'brands']) -> name('brands');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

Route::get('/Header',[HeaderController::class,'index'])->name('Header');
Route::get('/Header/Add',[HeaderController::class,'create']) -> name('Header.Add');
Route::post('/Header/store',[HeaderController::class,'store']) -> name('Header.store');
Route::get('/Header/Edit/{id}',[HeaderController::class,'edit']) -> name('Header.edit');
Route::put('/Header/Update/{id}',[HeaderController::class,'update']) -> name('Header.update');
Route::delete('/Header/Delete/{id}',[HeaderController::class,'destroy']) -> name('Header.delete');




Route::get('/Legacy', [LegacyController::class,'index'])->name('Legacy');
Route::get('/Legacy/Add', [LegacyController::class,'create']) -> name('Legacy.Add');
Route::post('/Legacy/store', [LegacyController::class,'store']) -> name('Legacy.store');
Route::get('/Legacy/Edit/{id}', [LegacyController::class,'edit']) -> name('Legacy.edit');
Route::put('/Legacy/Update/{id}', [LegacyController::class,'update']) -> name('Legacy.update');
Route::delete('/Legacy/Delete/{id}', [LegacyController::class, 'destroy']);


Route::get('/our-philosophy', [PhilosophyController::class,'index']) -> name('Philosophy');
Route::get('/Philosophy/Add', [PhilosophyController::class,'create']) -> name('Philosophy.Add');
Route::post('/Philosophy/store', [PhilosophyController::class,'store']) -> name('Philosophy.store');
Route::get('/Philosophy/Edit/{id}', [PhilosophyController::class,'edit']) -> name('Philosophy.edit');
Route::put('/Philosophy/Update/{id}', [PhilosophyController::class,'update']) -> name('Philosophy.update');
Route::delete('/Philosophy/Delete/{id}', [PhilosophyController::class, 'destroy']);

Route::get('/Learn-More', [LearnMoreController::class,'learnMore'])->name('learn-more');
Route::get('/LearnMore/Create', [LearnMoreController::class,'create']) -> name('LearnMore.Create');
Route::post('/LearnMore/store', [LearnMoreController::class,'store']) -> name('LearnMore.store');
Route::get('/LearnMore/Edit/{id}', [LearnMoreController::class,'edit']) -> name('LearnMore.edit');
Route::put('/LearnMore/Update/{id}', [LearnMoreController::class,'update']) -> name('LearnMore.update');
Route::delete('/LearnMore/Delete/{id}', [LearnMoreController::class, 'destroy']);

Route::get('/banner', [WhyChooseUsController::class, 'index']) -> name('banner');
Route::get('/banner/create', [WhyChooseUsController::class, 'create']) -> name('banner.create');
Route::post('/banner/store', [WhyChooseUsController::class, 'store']) -> name('banner.store');
Route::get('/banner/edit/{id}', [WhyChooseUsController::class, 'edit']) -> name('banner.edit');
Route::put('/banner/update/{id}', [WhyChooseUsController::class, 'update']) -> name('banner.update');
Route::delete('/banner/delete/{id}', [WhyChooseUsController::class, 'destroy']);

Route::get('/card', [WhyChooseUsController::class, 'cardIndex']) -> name('card');
Route::get('/card/create', [WhyChooseUsController::class, 'cardCreate']) -> name('card.create');
Route::post('/card/store', [WhyChooseUsController::class, 'cardStore']) -> name('card.store');
Route::get('/card/edit/{id}', [WhyChooseUsController::class, 'cardEdit']) -> name('card.edit');
Route::put('/card/update/{id}', [WhyChooseUsController::class, 'cardUpdate']) -> name('card.update');
Route::delete('/card/delete/{id}', [WhyChooseUsController::class, 'cardDestroy']) -> name('card.delete');

Route::get('/Pricing-Philosophy', [PricingPhilosophyController::class, 'index']) -> name('Pricing-Philosophy');
Route::get('/pricing-philosophy/create', [PricingPhilosophyController::class, 'create']) -> name('Pricing-Philosophy.create');
Route::post('/pricing-philosophy/store', [PricingPhilosophyController::class, 'store']) -> name('Pricing-Philosophy.store');
Route::get('/pricing-philosophy/edit/{id}', [PricingPhilosophyController::class, 'edit']) -> name('Pricing-Philosophy.edit');
Route::put('/pricing-philosophy/update/{id}', [PricingPhilosophyController::class, 'update']) -> name('pricing-philosophy.update');
Route::delete('/pricing-philosophy/delete/{id}', [PricingPhilosophyController::class, 'destroy']) -> name('Pricing-Philosophy.delete');

Route::get('/Pricing-Point', [PricingPhilosophyController::class, 'PointIndex']) -> name('Pricing-Point');
Route::get('/pricing-point/create', [PricingPhilosophyController::class, 'PointCreate']) -> name('Pricing-Point.create');
Route::post('/pricing-point/store', [PricingPhilosophyController::class, 'PointStore']) -> name('Pricing-Point.store');
Route::get('/pricing-point/edit/{id}', [PricingPhilosophyController::class, 'PointEdit']) -> name('Pricing-Point.edit');
Route::put('/pricing-point/update/{id}', [PricingPhilosophyController::class, 'PointUpdate']) -> name('Pricing-Point.update');
Route::delete('/pricing-point/delete/{id}', [PricingPhilosophyController::class, 'Pointdestroy']) -> name('Pricing-Point.delete');

Route::get('/Profile', [CompanyProfileController::class, 'index']) -> name('Profile');
Route::get('/Profile/Add', [CompanyProfileController::class, 'add']) -> name('Profile.add');
Route::post('/Profile/store', [CompanyProfileController::class, 'store']) -> name('Profile.store');
Route::get('/Profile/edit/{id}', [CompanyProfileController::class, 'edit']) -> name('Profile.edit');
Route::put('/Profile/update/{id}', [CompanyProfileController::class, 'update'])->name('Profile.update');
Route::delete('/Profile/delete/{id}', [CompanyProfileController::class, 'destroy']) -> name('Profile.destroy');


Route::get('/mission-vision', [MissionVisionController::class, 'index']) -> name('mission-vision');
Route::get('/mission-vision/create', [MissionVisionController::class, 'create'])->name('mission-vision.create');
Route::post('/mission-vision/store', [MissionVisionController::class, 'store']) -> name('missio-vision.store');
Route::get('/mission-vision/edit/{id}', [MissionVisionController::class, 'edit']) -> name('mission-vision.edit');
Route::put('/mission-vision/update/{id}', [MissionVisionController::class, 'update']) -> name('mission-vision.update');
Route::delete('/mission-vision/delete/{id}', [MissionVisionController::class, 'destroy']) -> name('mission-vision.destroy');

Route::get('/core-principle', [CorePrincipleController::class, 'index']) ->name('core-principle.index');
Route::get('core-principles/create', [CorePrincipleController::class, 'create']) -> name('core-principle.create');
Route::post('/core-principles/store', [CorePrincipleController::class, 'store']) -> name('core-principle.store');
Route::get('/core-principles/edit/{id}', [CorePrincipleController::class,'edit']) -> name('/core-principles.edit');
Route::put('/core-principles/update/{id}', [CorePrincipleController::class, 'update']) -> name('core-principles.update');

Route::get('/principle-point', [CorePrincipleController::class, 'pointindex']) -> name('point.index');
Route::get('/principle-point/create', [CorePrincipleController::class, 'pointcreate']) -> name('point.create');
Route::post('/principle-point/store', [CorePrincipleController::class, 'pointstore']) -> name('point.store');
Route::get('/principle-point/edit/{id}', [CorePrincipleController::class, 'pointedit']) -> name('point.edit');
Route::put('/principle-point/update/{id}',[CorePrincipleController::class, 'pointupdate']) -> name('point.update');
Route::delete('/principle-point/delete/{id}', [CorePrincipleController::class, 'pointdelete']) -> name('point.delete');

Route::get('/Engineering', [EngineeringController::class, 'index']) -> name('Engineering.index');
Route::get('/engineering/create', [EngineeringController::class, 'create']) -> name('engineering.create');
Route::post('/engineering/store', [EngineeringController::class, 'store']) -> name('engineering.store');
Route::get('/engineering/edit/{id}', [EngineeringController::class, 'edit']) -> name('engineering.edit');
Route::put('/engineering/update/{id}', [EngineeringController::class, 'update']) -> name('engineering.update');
Route::delete('/engineering/delete/{id}', [EngineeringController::class, 'destroy']) -> name('engineering.delete');

Route::get('/engineering-points', [EngineeringController::class, 'pointindex']) -> name('engineering-points.index');
Route::get('/engineering-point/create', [EngineeringController::class, 'pointcreate']) ->name('engineering-points.create');
Route::post('/engineering-point/store', [EngineeringController::class, 'pointstore']) -> name('engineering-points.store');
Route::get('/engineering-point/edit/{id}', [EngineeringController::class, 'pointedit']) -> name('engineering-points.edit');
Route::put('/engineering-point/update/{id}', [EngineeringController::class, 'pointupdate']) -> name('engineering-points.update');
Route::delete('/engineering-point/delete/{id}', [EngineeringController::class, 'pointdelete']) -> name('engineering-points.delete');

Route::get('/product', [SolutionController::class, 'index']) -> name('product.index');
Route::get('/product/create', [SolutionController::class, 'create']) -> name('product.create');
Route::post('/product/store', [SolutionController::class, 'store']) -> name('product.store');
Route::get('/product/edit/{id}', [SolutionController::class, 'edit']) -> name('product.edit');
Route::put('/product/update/{id}', [SolutionController::class, 'update']) -> name('product.update');
Route::delete('/product/delete/{id}', [SolutionController::class, 'destroy']) -> name('product.delete');

Route::get('/loading-bay', [SolutionController::class, 'loadingbayIndex']) -> name('loading-bay.index');
Route::get('/loading-solutions/create', [SolutionController::class, 'loadingbaycreate']) -> name('loading-solutions.create');
Route::post('/loading-solutions/store', [SolutionController::class, 'loadingbaystore']) -> name('loading-solutions.store');
Route::get('/loading-solutions/edit/{id}', [SolutionController::class, 'loadingbayedit']) -> name('loading-solutions.edit');
Route::put('/loading-solutions/edit/{id}', [SolutionController::class, 'loadingbayupdate']) -> name('loading-solutions.update');
Route::delete('/loading-solutions/delete/{id}', [SolutionController::class, 'loadingbaydestroy']) -> name('loading-solutions.delete');

Route::get('automation', [SolutionController::class, 'automationindex']) -> name('automation.index');
Route::get('/automation/create', [SolutionController::class, 'automationcreate']) -> name('automation.create');
Route::post('/automation/store', [SolutionController::class, 'automationstore']) -> name('automation.store');
Route::get('/automation/edit/{id}', [SolutionController::class, 'automationedit']) -> name('automation.edit');
Route::put('/automation/update/{id}', [SolutionController::class, 'automationupdate']) -> name('automation.update');
Route::delete('/automation/delete/{id}', [SolutionController::class, 'automationdelete']) -> name('automation.delete');

Route::get('/quality', [SolutionController::class, 'qualityindex']) -> name('quality.index');
Route::get('quality/create', [SolutionController::class, 'qualitycreate']) -> name('quality.create');
Route::post('/quality/store', [SolutionController::class, 'qualitystore']) -> name('quality.store');
Route::get('/quality/edit/{id}', [SolutionController::class, 'qualityedit']) -> name('quality.edit');
Route::put('/quality/update/{id}', [SolutionController::class, 'qualityupdate']) -> name('quality.update');
Route::delete('/quality/delete/{id}', [SolutionController::class, 'qualitydelete']) -> name('quality.delete');

Route::get('/service', [ServiceController::class, 'serviceindex']) -> name('service.index');
Route::get('/services/create', [ServiceController::class, 'servicescreate']) -> name('services.create');
Route::post('/services/store', [ServiceController::class, 'servicesstore']) -> name('services.store');
Route::get('/services/{id}/edit', [ServiceController::class, 'serviceedit']) -> name('service.edit');
Route::put('/services/update/{id}', [ServiceController::class, 'serviceupdate']) -> name('service.update');
Route::delete('/services/delete/{id}', [ServiceController::class, 'servicedestroy']) -> name('service.destroy');

Route::get('/industry', [ServiceController::class, 'industryindex']) -> name('industry.index');
Route::get('/industries/create', [ServiceController::class, 'industrycreate']) -> name('industry.create');
Route::post('/industries/store', [ServiceController::class, 'industrystore']) -> name('industry.store');
Route::get('/industries/{id}/edit', [ServiceController::class, 'industryedit']) -> name('industry.edit');
Route::put('/industries/update/{id}', [ServiceController::class, 'industryupdate']) -> name('industry.update');
Route::delete('/industries/delete/{id}', [ServiceController::class, 'industrydestroy']) -> name('industry.destroy');

Route::get('/contact-support', [ServiceController::class, 'contactindex']) -> name('contact.index');
Route::get('/contacts/create', [ServiceController::class, 'contactcreate']) -> name('contact.create');
Route::post('/contacts/store', [ServiceController::class, 'contactstore']) -> name('contact.store');
Route::get('/contacts/{id}/edit', [ServiceController::class, 'contactedit']) -> name('contact.edit');
Route::put('/contacts/update/{id}', [ServiceController::class, 'contactupdate']) -> name('contact.update');
Route::delete('/contacts/delete/{id}', [ServiceController::class, 'contactdestroy']) -> name('contact.destroy');

Route::get('/quote-request', [ServiceController::class, 'quote']) -> name('quote');
Route::post('/quote-request/store', [ServiceController::class, 'quotestore']) -> name('quote.store');
Route::get('/quote', [ServiceController::class, 'quoteindex']) -> name('quote.index');
Route::post('/quotes/{id}/status', [ServiceController::class, 'quoteStatusUpdate']) -> name('quote.status.update');
Route::delete('/quotes/delete/{quote}', [ServiceController::class, 'quoteDestroy'])->name('quote.destroy');

Route::get('/brand', [ServiceController::class, 'brandindex']) -> name('brand.index');
Route::get('/brand/create', [ServiceController::class, 'brandcreate']) -> name('brand.create');
Route::post('/brand/store', [ServiceController::class, 'brandstore']) -> name('brand.store');
Route::get('/brand/edit/{id}', [ServiceController::class, 'brandedit']) -> name('brand.edit');
Route::put('/brand/update/{id}', [ServiceController::class, 'brandupdate']) -> name('brand.update');
Route::delete('/brand/delete/{id}', [ServiceController::class, 'branddestroy']) -> name('brand.destroy');

Route::get('/users', [UserController::class, 'index']) -> name('users.index');
Route::get('/users/create', [UserController::class, 'create']) -> name('users.create');
Route::post('/users/store', [UserController::class, 'store']) -> name('users.store');
Route::get('/users/{user}/edit', [UserController::class, 'edit']) -> name('users.edit');
Route::put('/users/update/{user}', [UserController::class, 'update']) -> name('users.update');
Route::delete('/users/delete/{id}', [UserController::class, 'destroy']) -> name('users.destroy');



require __DIR__.'/auth.php';
