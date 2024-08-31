from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json



@csrf_exempt
def verify_code(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            code = data.get('code')

            # Debugging print statement
            print(f"Received code: {code}")

            # Validation logic
            if not code or len(code) != 6 or code[-1] == '7':
                return JsonResponse({'error': 'Verification Error'}, status=400)

            return JsonResponse({'success': True})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'error': 'Invalid method'}, status=405)

def success(request):
    return render(request, 'verify/success.html')

def index(request):
    return render(request, 'verify/index.html')