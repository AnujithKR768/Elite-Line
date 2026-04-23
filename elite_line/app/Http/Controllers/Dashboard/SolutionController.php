<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\AutomationSystem;
use App\Models\LoadingSolution;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\QualityStandard;
use Illuminate\Support\Facades\Storage;

class SolutionController extends Controller
{
    public function index()
    {
        $product = Product::orderBy('id', 'asc') -> paginate(10);
        return Inertia::render('solution/product/Index',[
            'product' => $product
        ]);
    }

    public function create ()
    {
        return Inertia::render('solution/product/Create');
    }

   public function store(Request $request)
    {
        // Validation
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        // Handle Image Upload
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        // Save to DB
        Product::create($data);

        // Redirect back
        return redirect()->route('product.index')-> with('success', 'Product created successfully!');
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('solution/product/Edit', [
            'product' => $product
        ]);
    }

    public function update(Request $request,$id)
    {
        $product = Product::findOrFail($id);

        // Validation
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // Default: keep existing image
        $imagePath = $product->image;

        // If new image uploaded
        if ($request->hasFile('image')) {

            // Delete old image (optional but recommended)
            if ($product->image && Storage::exists('public/' . $product->image)) {
                Storage::delete('public/' . $product->image);
            }

            // Store new image
            $imagePath = $request->file('image')->store('products', 'public');
        }

        // Update data
        $product->update([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath, // keep old if no new upload
        ]);

        return redirect()
            ->route('product.index')
            ->with('success', 'Product updated successfully!');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Delete image if exists
        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }

        // Delete product
        $product->delete();

        return redirect()
            ->route('product.index')
            ->with('success', 'Product deleted successfully');
    }



    // Loading Bay Solution


    public function loadingbayIndex()
    {
        $solutions = LoadingSolution::orderBy('id', 'asc') -> paginate(5);

        return Inertia::render('solution/loading_bay/Index',[
            'solutions' => $solutions
        ]);
    }

    public function loadingbaycreate()
    {
        return Inertia::render('solution/loading_bay/Create');
    }

    public function loadingbaystore(Request $request)
    {
        // Validation
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'sub_title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        // Image Upload
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('loading-solutions', 'public');
        }

        // Save to DB
        LoadingSolution::create($data);

        // Redirect (for Inertia)
        return redirect()->route('loading-bay.index')->with('success', 'Created successfully');
    }

    public function loadingbayedit($id)
    {
        $solutions = LoadingSolution::findOrFail($id);

        return Inertia::render('solution/loading_bay/Edit', [
            'solutions' => $solutions
        ]);
    }

    public function loadingbayupdate(Request $request, $id)
    {
        // Find existing record
        $solutions = LoadingSolution::findOrFail($id);

        // Validation
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'sub_title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        // Check if new image uploaded
        if ($request->hasFile('image')) {

            // Delete old image (optional but recommended)
            if ($solutions->image && Storage::exists('public/' . $solutions->image)) {
                Storage::delete('public/' . $solutions->image);
            }

            // Store new image
            $data['image'] = $request->file('image')->store('loading-solutions', 'public');
        } else {
            // Keep existing image
            $data['image'] = $solutions->image;
        }

        // Update record
        $solutions->update($data);

        return redirect()
            ->route('loading-bay.index')
            ->with('success', 'Updated successfully');
    }

    public function loadingbaydestroy($id)
    {
        $solution = LoadingSolution::findOrFail($id);

        // Delete image if exists
        if ($solution -> image && Storage::disk('public') -> exists($solution ->image)){
            Storage::disk('public') -> delete($solution -> image);
        }

        $solution -> delete();

        return redirect()
            ->route('loading-bay.index')
            ->with('success', 'Deleted successfully');
    }



    // Automation System


    public function automationindex()
    {
        $automation = AutomationSystem::orderBy('id', 'asc') -> paginate(5);

        return Inertia::render('solution/automation/Index',[
            'automation' => $automation
        ]);
    }

    public function automationCreate()
    {
        return Inertia::render('solution/automation/Create');
    }

    public function automationstore(Request $request)
    {
    // Validation
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'points' => 'required|array',
        'points.*' => 'required|string',
        'footer' => 'nullable|string',
    ]);

    // Store Data
    AutomationSystem::create([
        'title' => $validated['title'],
        'description' => $validated['description'],
        'points' => $validated['points'], // stored as JSON
        'footer' => $validated['footer'] ?? null,
    ]);

    // Redirect
    return redirect()
        ->route('automation.index') -> with('success', 'Automation created successfully!');
    }

    public function automationedit($id)
    {
        $automation = AutomationSystem::findOrFail($id);

        return Inertia::render('solution/automation/Edit',[
            'automation' => $automation
        ]);
    }

    public function automationupdate(Request $request, $id)
    {
        $automation = AutomationSystem::findOrFail($id);

        // Validation

        $data = $request -> validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'points' => 'required|array',
            'points.*' => 'required|string',
            'footer' => 'nullable|string',
        ]);

        // Update Data

        $automation -> update([
            'title' => $data['title'],
            'description' => $data['description'],
            'points' => $data['points'], // stored as JSON
            'footer' => $data['footer']  ?? null,
        ]);

        // Redirect

        return redirect()
            ->route('automation.index')
            ->with('success', 'Automation updated successfully!');
    }

    public function automationdelete($id)
    {
        $automation = AutomationSystem::findOrFail($id);
        $automation -> delete();

        return redirect()
            ->route('automation.index')
            ->with('success', 'Automation deleted successfully');
    }





    // Quality Standard

    public function qualityindex()
    {
        $quality = QualityStandard::orderBy('id', 'asc') -> paginate(5);

        return Inertia::render('solution/quality/Index',[
            'quality' => $quality
        ]);
    }

    public function qualitycreate()
    {
        return Inertia::render('solution/quality/Create');
    }
    public function qualitystore(Request $request)
    {
        // Validation
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'point' => 'required|array',
            'point.*' => 'required|string',
        ]);

        // Store data
        QualityStandard::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'point' => $validated['point'], // stored as JSON
        ]);

        // Redirect
        return redirect() -> route('quality.index') -> with('success', 'Quality standard created successfully!');
    }

    public function qualityedit($id)

    {
        $quality = QualityStandard::findOrFail($id);

        return Inertia::render('solution/quality/Edit', [
            'quality' => $quality,
        ]);
    }

    public function qualityupdate(Request $request, $id)
    {
        $quality = QualityStandard::findOrFail($id);

        // Validation
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'point' => 'required|array',
            'point.*' => 'required|string',
        ]);

        // Update data
        $quality->update([
            'title' => $data['title'],
            'description' => $data['description'],
            'point' => $data['point'], // stored as JSON
        ]);

        // Redirect
        return redirect()
            ->route('quality.index')
            ->with('success', 'Quality standard updated successfully!');
    }

    public function qualitydelete($id)
    {
        $quality = QualityStandard::findOrFail($id);
        $quality->delete();

        return redirect()
            ->route('quality.index')
            ->with('success', 'Quality standard deleted successfully');
    }

}
